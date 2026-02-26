import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import * as accountService from "../../services/accountService";
import "../form.css";

type RegisterProps = {
    onRegistered: (email: string) => void;
    onSwitch: () => void;
}

export function RegisterForm({ onRegistered, onSwitch }: RegisterProps) {
    const { t } = useTranslation();

    const registerSchema = z.object({
        name: z.string().min(1, t('alert.nameRequired')),
        email: z.string().email(t('alert.incorrectEmail')),
        password: z.string().min(6, t('alert.passwordMinLength'))
    });

    type FormData = z.infer<typeof registerSchema>;

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await accountService.registerUser(data);
            onRegistered(data.email);
        } catch (err) {
            const axiosErr = err as AxiosError<{ error: string }>;
            const serverMessage = axiosErr.response?.data?.error;

            if (serverMessage?.toLowerCase().includes("email") && serverMessage?.toLowerCase().includes("user")) {
                setError("email", { type: "server", message: serverMessage });

                return;
            }

            if (serverMessage?.toLowerCase().includes("password")) {
                setError("password", { type: "server", message: serverMessage });

                return;
            }

            alert(serverMessage || "Server error");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('titles.createAccount')}</h2>
            <div className="field">
                <label>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        className={errors.name ? "input-error" : ""}
                    />
                </label>
                {errors.name && (
                    <p className="error-text">{errors.name.message}</p>
                )}
            </div>
            <div className="field">
                <label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className={errors.email ? "input-error" : ""}
                    />
                </label>
                {errors.email && (
                    <p className="error-text">{errors.email.message}</p>
                )}
            </div>
            <div className="field">
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className={errors.password ? "input-error" : ""}
                    />
                </label>
                {errors.password && (
                    <p className="error-text">{errors.password.message}</p>
                )}
            </div>

            <div className='bottom-btn-form'>
                <button type="submit" className="submit">{t("buttons.signup")}</button>

                <p className='bottom-text'>
                    {t('common.haveAcc')}
                    <span onClick={onSwitch}>{t("titles.logIn")}</span>
                </p>
            </div>
        </form>
    )

}