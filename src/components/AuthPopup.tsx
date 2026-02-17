import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as accountService from "../services/accountService";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import * as userActions from '../store/authSlice';
import { AxiosError } from "axios";
import './popupDetails.css';
import { useTranslation } from 'react-i18next';
import { initHabits } from '../store/habitsThunks';

export function AuthPopup({ onClose }: { onClose: () => void }) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<"login" | "register">("login");
    const dispatch = useDispatch<AppDispatch>();

    const registerSchema = z.object({
        name: z.string().min(1, t('alert.nameRequired')),
        email: z.string().email(t('alert.incorrectEmail')),
        password: z.string().min(6, t('alert.passwordMinLength'))
    });

    const loginSchema = registerSchema.omit({ name: true });

    type AuthFormData = {
        name?: string;
        email: string;
        password: string;
    };

    const schema = mode === "login" ? loginSchema : registerSchema;

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<AuthFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: AuthFormData) => {
        try {
            let userData;

            if (mode === "register") {
                userData = await accountService.registerUser(data);
            } else {
                userData = await accountService.loginUser(data);
            }

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

    const toggleMode = () => {
        setMode(mode === "login" ? "register" : "login");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {mode === "register" && (
                <>
                    <h2>{t('titles.createAccount')}</h2>
                    <label className='inp'>
                        <input
                            type='text'
                            placeholder='Name'
                            {...register("name")}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                    </label>
                </>
            )}
            {mode === "login" && (
                <h2>{t('titles.logIn')}</h2>
            )}
            <label className='inp'>
                <input
                    type='email'
                    placeholder='Email'
                    {...register("email")}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </label>
            <label className='inp'>
                <input
                    type='password'
                    placeholder='Password'
                    {...register("password")}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </label>

            <div className='bottom-btn-form'>
                <button type="submit" className='submit'>
                    {mode === "login" ? t('titles.logIn') : t('buttons.signup')}
                </button>
                <button type="button" onClick={onClose} className='cancel'>{t('buttons.cancel')}</button>
                <div className='bottom-text'>
                    <p>
                        {mode === "login" ? t('common.unauth') : t('common.haveAcc')}
                        <span onClick={toggleMode}>
                            {mode === "login" ? t('titles.register') : t('titles.logIn')}
                        </span>
                    </p>
                </div>
            </div>
        </form>
    );
}
