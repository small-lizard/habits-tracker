import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { VerifyForm } from "./VerifyForm";

type Step = "login" | "register" | "verify";

type authProps = {
    onClose: () => void;
    onSuccess: () => void;
};

export function AuthModal({ onClose, onSuccess }: authProps) {
    const [step, setStep] = useState<Step>("login");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

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
                    onRegistered={(email, name) => {
                        setEmail(email);
                        setName(name);
                        setStep("verify");
                    }}
                    onSwitch={() => setStep("login")}
                />
            )}

            {step === "verify" && (
                <VerifyForm
                    email={email}
                    name={name}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}