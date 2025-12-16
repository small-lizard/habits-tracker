import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import '../popupDetails.css';

type ChangePasswordProps = {
    onClose: () => void;
    resetPassword: (password: string, newPassword: string) => Promise<void> | void;
    closeOpthions: () => void,
};

export function ChangePasswordPopup({ onClose, resetPassword, closeOpthions }: ChangePasswordProps) {

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Change password</h3>
            <label className="inp">
                <input
                    type="password"
                    placeholder="Current password"
                    {...register("password")}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </label>

            <label className="inp">
                <input
                    type="password"
                    placeholder="New password"
                    {...register("newPassword")}
                />
                {errors.newPassword && <p style={{ color: "red" }}>{errors.newPassword.message}</p>}
            </label>

            <button type="submit" className="submit">Change</button>
            <button type="button" onClick={() => { reset(); onClose(); closeOpthions()}} className="cancel">Cancel</button>
        </form>
    );
}
