import "./popup.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AxiosError } from "axios";

type ChangePasswordProps = {
    onClose: () => void;
    resetPassword: (password: string, newPassword: string) => Promise<void> | void;
};

export function ChangePasswordPopup({ onClose, resetPassword }: ChangePasswordProps) {
    const ref = useRef<HTMLFormElement | null>(null);

    useOnClickOutside(ref, onClose, true)

    const resetSchema = z.object({
        password: z.string().min(6, "Password must be at least 6 characters long"),
        newPassword: z.string().min(6, "Password must be at least 6 characters long"),
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
        } catch (error) {
            const axiosErr = error as AxiosError<{ error: string }>;
            const serverMessage = axiosErr.response?.data?.error;

            if (serverMessage?.toLowerCase().includes("password")) {
                setError("password", { type: "server", message: serverMessage });
                return;
            }
            
            alert(serverMessage || "Server error");

        }
    };

    return (
        <div className="popup-overlay">
            <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="popup-form">
                <div className="name-wrapper">
                    <label className="inp">
                        <input
                            type="password"
                            placeholder="Current password"
                            {...register("password")}
                        />
                        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                    </label>
                </div>

                <div className="name-wrapper">
                    <label className="inp">
                        <input
                            type="password"
                            placeholder="New password"
                            {...register("newPassword")}
                        />
                        {errors.newPassword && <p style={{ color: "red" }}>{errors.newPassword.message}</p>}
                    </label>
                </div>

                <button type="submit" className="submit">Change</button>
                <button type="button" onClick={() => { reset(); onClose(); }} className="cancel">Cancel</button>
            </form>
        </div>
    );
}
