import { useEffect, useRef, useState } from "react";

type OTPProps = {
    length?: number;
    onComplete?: (code: string) => void;
};

export const OTP = ({ length = 6, onComplete }: OTPProps) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.every((digit) => digit !== "")) {
            onComplete?.(newOtp.join(""));
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: any, index: number) => {
        e.preventDefault()
        const paste = e.clipboardData.getData("text");
        const digits = paste.replace(/\D/g, "");

        const newOtp = [...otp];
        let i = index;
        for (const digit of digits) {
            if (i < length) {
                newOtp[i] = digit;
                i++;
            } else break;
        }
        setOtp(newOtp);

        inputsRef.current[Math.min(i, length - 1)]?.focus();

        if (newOtp.every((d) => d !== "")) {
            onComplete?.(newOtp.join(""));
        }
    };

    const handleClick = (index: number) => {
        const input = inputsRef.current[index];
        if (!input) return;

        const len = input.value.length;
        input.setSelectionRange(len, len);
    };

    return (
        <div className="box-container">
            {
                otp.map((digit, index) => (
                    <input
                        key={index}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                        onClick={() => handleClick(index)}
                        ref={(el) => {
                            if (el) {
                                inputsRef.current[index] = el;
                            }
                        }}
                        className="input-tile"
                    />
                ))
            }
        </div>
    )
}