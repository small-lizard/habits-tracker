import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as accountService from  "../services/accountService";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import * as userActions from '../store/authSlice';
import { AxiosError } from "axios";
import './popupDetails.css';

export function AuthPopup({ onClose }: { onClose: () => void }) {
    const [mode, setMode] = useState<"login" | "register">("login");
    const dispatch = useDispatch<AppDispatch>();

    const registerSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Incorrect email"),
        password: z.string().min(6, "Password must be at least 6 characters long")
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

            onClose();

        } catch (err) {
            console.log(err)
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
                    <h3>Create account</h3>
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
                <h3>Log in</h3>
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
            <button type="submit" className='submit'>
                {mode === "login" ? "Log in" : "Sign up"}
            </button>
            <button type="button" onClick={onClose} className='cancel'>Cancel</button>
            <p>
                {mode === "login" ? "No account?" : "Already have an account?"}
                <span onClick={toggleMode} style={{ cursor: "pointer", color: "blue", marginLeft: 4 }}>
                    {mode === "login" ? "Register" : "Log in"}
                </span>
            </p>
        </form>
    );
}
