import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import * as userActions from "../../store/authSlice";
import { initHabits } from "../../store/habitsThunks";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import * as accountService from "../../services/accountService";
import "../form.css";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";

type LoginProps = {
    onClose: () => void;
    onSwitch: () => void;
}

export function LoginForm({ onClose, onSwitch }: LoginProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const loginSchema = z.object({
        email: z.string().email(t('alert.incorrectEmail')),
        password: z.string().min(6, t('alert.passwordMinLength'))
    })

    type FormData = z.infer<typeof loginSchema>;

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });


    const onSubmit = async (data: FormData) => {
        try {
            const userData = await accountService.loginUser(data);

            dispatch(userActions.setUser({
                id: userData.id,
                isAuth: true,
                name: userData.name,
                email: userData.email
            }));

            await dispatch(initHabits());
            onClose();
        } catch (err) {
            const axiosErr = err as AxiosError<{ error: string }>;
            const serverMessage = axiosErr.response?.data?.error;

            if (serverMessage?.toLowerCase().includes("email")) {
                setError("email", { type: "server", message: serverMessage });

                return;
            }

            if (serverMessage?.toLowerCase().includes("password")) {
                setError("password", { type: "server", message: serverMessage });

                return;
            }

            alert(serverMessage || "Server error");
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('titles.logIn')}</h2>
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
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                        className={errors.password ? "input-error" : ""}
                    />
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(prev => !prev)}
                        className="toggle-password"
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </label>
            {errors.password && (
                <p className="error-text">{errors.password.message}</p>
            )}
        </div>

        <div className='bottom-btn-form'>
            <button type="submit" className="submit">{t("titles.logIn")}</button>
            <button type="button" onClick={onClose} className='cancel'>{t('buttons.cancel')}</button>

            <div className='bottom-text'>
                <p>
                    {t("common.unauth")}
                    <span onClick={onSwitch}>{t("titles.register")}</span>
                </p>
            </div>
        </div>
    </form>
    )
}