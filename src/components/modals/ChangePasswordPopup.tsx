import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import '../form.css';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";

type ChangePasswordProps = {
    onClose: () => void;
    resetPassword: (password: string, newPassword: string) => Promise<void> | void;
    closeOpthions: () => void
};

const serverErrorMap: Record<string, { field?: string, key: string }> = {
    INVALID_PASSWORD: { field: "password", key: "error.invalidPassword" }
}

export function ChangePasswordPopup({ onClose, resetPassword, closeOpthions }: ChangePasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { t } = useTranslation();
    const resetSchema = z.object({
        password: z.string().min(6, t('alert.passwordMinLength')),
        newPassword: z.string().min(6, t('alert.passwordMinLength')),
    });
    type FormData = z.infer<typeof resetSchema>;

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>({
        resolver: zodResolver(resetSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await resetPassword(data.password, data.newPassword);
            reset();
            onClose();
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
            alert(serverMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('titles.changePassword')}</h2>
            <div className="field">
                <label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t('placeholder.currentPassword')}
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
            <div className="field">
                <label>
                    <div className="input-wrapper">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder={t('placeholder.newPassword')}
                            {...register("newPassword")}
                            className={errors.newPassword ? "input-error" : ""}
                        />
                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowNewPassword(prev => !prev)}
                            className="toggle-password"
                        >
                            {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </label>
                {errors.newPassword && (
                    <p className="error-text">{errors.newPassword.message}</p>
                )}
            </div>
            <div className='bottom-btn-form'>
                <button type="submit" className="submit">{t('buttons.change')}</button>
                <button
                    type="button"
                    onClick={() => { reset(); onClose(); closeOpthions() }}
                    className="cancel"
                >{t('buttons.cancel')}</button>
            </div>
        </form>
    );
}
