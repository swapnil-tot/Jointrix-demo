import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Button = ({ className, children, disabled, ...props }: ButtonProps) => {
    return (
        <button className={className} disabled={disabled} {...props}>
            {children}
        </button>
    )
}