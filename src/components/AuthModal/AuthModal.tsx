import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { VerifyForm } from "./VerifyForm";

type Step = "login" | "register" | "verify";

export function AuthModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<Step>("login");
    const [email, setEmail] = useState("")

    return (
        <>
            {step === "login" && (
                <LoginForm
                    onClose={onClose}
                    onSwitch={() => setStep("register")}
                />
            )}

            {step === "register" && (
                <RegisterForm
                    onRegistered={(email) => {
                        setEmail(email);
                        setStep("verify");
                    }}
                    onSwitch={() => setStep("login")}
                />
            )}

            {step === "verify" && (
                <VerifyForm
                    email={email}
                    onClose={onClose}
                />
            )}
        </>
    );
}