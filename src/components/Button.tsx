import React from 'react';
import { ReactNode } from "react";
import './button.css'; 

type ButtonProps = {
    className: string,
    children: ReactNode,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void,
}

export function Button ({ className, children, type = "button", onClick}: ButtonProps) {
    return <div>
        <button type={type} className={className} onClick={onClick}>{children}</button>
    </div>
}