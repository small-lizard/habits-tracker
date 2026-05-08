import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import * as accountService from "../../services/accountService";
import "../form.css";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";
import { ErrorAlert } from "../notifications/Error";
import { getMinutesAndSeconds } from "../../utils/dateUtils";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import * as userActions from "../../store/authSlice";
import { initHabits } from "../../store/habitsThunks";

type RegisterProps = {
    onRegistered: (email: string, name: string) => void;
    onSwitch: () => void;
    onClose: () => void;
    onSuccess: () => void;
}

const serverErrorMap: Record<string, { field?: string, key: string }> = {
    USER_ALREADY_EXISTS: { field: "email", key: "error.userExist" },
}

export function RegisterForm({ onRegistered, onSwitch, onClose, onSuccess }: RegisterProps) {
    const { t } = useTranslation();
    const [isAlert, setAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const userData = await accountService.googleAuth(response.code);

            dispatch(userActions.setUser({
                id: userData.id,
                isAuth: true,
                name: userData.name,
                email: userData.email
            }));
            await new Promise(resolve => setTimeout(resolve, 300));

            await dispatch(initHabits());
            onClose();
            onSuccess();
        },
        onError: () => console.log('error'),
        flow: 'auth-code',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const blockUntil = Number(localStorage.getItem("otpBlockUntil"));
            const diff = blockUntil - Date.now();

            setRemaining(diff > 0 ? diff : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const registerSchema = z.object({
        name: z.string().min(1, t('alert.nameRequired')),
        email: z.string().email(t('alert.incorrectEmail')),
        password: z
            .string()
            .min(6, t('alert.passwordMinLength'))
            .max(100, t("alert.passwordTooLong"))
    });

    type FormData = z.infer<typeof registerSchema>;

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await accountService.registerUser(data);
            onRegistered(data.email, data.name);
        } catch (err) {
            const axiosErr = err as AxiosError<{ error: string, code: string }>;
            const serverMessage = axiosErr.response?.data?.error ?? "Server error";
            const serverCode = axiosErr.response?.data?.code;
            const error = serverErrorMap[serverCode ?? ""];

            if (error) {
                if (error.field) {
                    setError(error.field as any, {
                        type: "server",
                        message: t(error.key)
                    })

                    return;
                }
            }

            if (axiosErr.response?.status === 429) {
                setAlert(true);

                return;
            }

            alert(serverMessage);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('titles.createAccount')}</h2>

            <div className="form-wrapper">

                {isAlert && (
                    <ErrorAlert
                        title={t('alert.attemptsTitle')}
                        message={t('alert.attemptsText', {
                            time: getMinutesAndSeconds(remaining),
                        })}
                        onClose={() => setAlert(false)}
                    ></ErrorAlert>
                )}

                <button
                    type="button"
                    onClick={() => login()}
                    className="google-login-btn"
                >
                    <FcGoogle size={30} />
                    {t("buttons.googleAuth")}
                </button>

                <div className="divider">
                    <span>or</span>
                </div>

                <div>
                    <label>
                        <input
                            type="text"
                            placeholder={t('placeholder.name')}
                            {...register("name")}
                            className={errors.name ? "input-error" : ""}
                        />
                    </label>
                    {errors.name && (
                        <p className="error-text">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label>
                        <input
                            type="email"
                            placeholder={t('placeholder.email')}
                            {...register("email")}
                            className={errors.email ? "input-error" : ""}
                        />
                    </label>
                    {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={t('placeholder.password')}
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
                    <button type="submit" className="submit">{t("buttons.signup")}</button>
                    <button type="button" onClick={onClose} className='cancel'>{t('buttons.cancel')}</button>

                    <p className='bottom-text'>
                        {t('common.haveAcc')}
                        <span onClick={onSwitch}>{t("titles.logIn")}</span>
                    </p>
                </div>
            </div>
        </form>
    )
}