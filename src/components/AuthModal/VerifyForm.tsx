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
import { useEffect, useState } from "react";
import { ErrorAlert } from "../notifications/Error";
import { getMinutesAndSeconds } from "../../utils/dateUtils";

type verifyProps = {
    email: string;
    name: string;
    onClose: () => void;
    onSuccess: () => void;
};

const serverErrorMap: Record<string, { field?: string, key: string }> = {
    USER_NOT_FOUND_BY_EMAIL: { key: "error.emailNotExist" },
    CODE_EXPIRED: { field: "code", key: "error.codeExpired" },
    INVALID_VERIFICATION_CODE: { field: "code", key: "error.invalidCode" },
}

export function VerifyForm({ email, name, onClose, onSuccess }: verifyProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [isAlert, setAlert] = useState(false);
    const [counter, setCounter] = useState(45);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const blockUntil = Number(localStorage.getItem("otpBlockUntil"));
            const diff = blockUntil - Date.now();

            setRemaining(diff > 0 ? diff : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const verifySchema = z.object({
        code: z.string()
            .min(1, t("alert.codeRequired"))
            .length(6, t('alert.codeRequired'))
            .regex(/^\d+$/, t('alert.onlyDigits'))
    });

    type FormData = z.infer<typeof verifySchema>;

    const { handleSubmit, formState: { errors }, setValue, setError, getValues } = useForm<FormData>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ""
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
            onSuccess();
        } catch (err) {
            const axiosErr = err as AxiosError<{ error: any, code: string }>;
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
                const retryAfter = axiosErr.response?.headers['retry-after'];
                const ms = retryAfter
                    ? Number(retryAfter) * 1000
                    : 15 * 60 * 1000;
                const blockUntil = Date.now() + ms;

                localStorage.setItem("otpBlockUntil", String(blockUntil));
                setAlert(true);

                return;
            }

            alert(serverMessage);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const handleSendingCode = async () => {
        await accountService.sendOTP(email, name);
        setCounter(45);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="verify-form">
            <h2>{t('titles.verifyEmail')}</h2>
            {isAlert && (
                <ErrorAlert
                    title={t('alert.attemptsTitle')}
                    message={t('alert.attemptsText', {
                        time: getMinutesAndSeconds(remaining),
                    })}
                    onClose={() => setAlert(false)}
                ></ErrorAlert>
            )}
            <p className="verify-form-text">{t('alert.sentCode')}{maskEmail(email)}</p>
            <div className="field">
                <OTP length={6} onComplete={(code) => {
                    setValue("code", code)
                }} />
                {errors.code && <p className="error-text">{errors.code.message}</p>}
            </div>
            <div className="timer">
                <p className="timer-text">
                    {counter > 0
                        ? t('common.requestCode', { counter: counter })
                        : t('common.canRequestCode')
                    }
                </p>
                <button
                    type="button"
                    onClick={() => handleSendingCode()}
                    disabled={counter > 0}
                    className="timer-button"
                >{t("buttons.resendCode")}</button>
            </div>
            <div className='bottom-btn-form'>
                <button type="submit" className="submit">{t("buttons.confirm")}</button>
            </div>
        </form>
    )
}

export function maskEmail(email: string) {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;

    return `${name.slice(0, 3)}****@${domain}`;
}