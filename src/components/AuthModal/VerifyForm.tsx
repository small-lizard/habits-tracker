import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as accountService from "../../services/accountService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import * as userActions from "../../store/authSlice";
import { initHabits } from "../../store/habitsThunks";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import "../form.css";
import { OTP } from "./OTP";

type LoginProps = {
    email: string;
    onClose: () => void;
};

export function VerifyForm({ email, onClose }: LoginProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const verifySchema = z.object({
        code: z.string()
            .min(1, t("alert.codeRequired"))
            .length(6, t('alert.codeRequired'))
            .regex(/^\d+$/, t('alert.onlyDigits'))
    });

    type FormData = z.infer<typeof verifySchema>;

    const { handleSubmit, formState: { errors }, setValue, setError } = useForm<FormData>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            const userData = await accountService.verifyEmail(email, data.code);

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

            if (serverMessage?.toLowerCase().includes("code")) {
                setError("code", { type: "server", message: serverMessage });
                return;
            }

            alert(serverMessage || "Server error");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="verify-form">
            <h2>{t('titles.verifyEmail')}</h2>
            <p className="verify-form-text">{t('alert.sentCode')}{email}</p>
            <div className="field">
                <OTP length={6} onComplete={(code) => setValue("code", code)} />
                {errors.code && <p className="error-text">{errors.code.message}</p>}
            </div>
            <button type="submit" className="submit">{t("buttons.confirm")}</button>
        </form>
    );
}