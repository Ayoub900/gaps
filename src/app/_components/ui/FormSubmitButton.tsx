"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode;
    className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
    children,
    className = "",
    ...props
}: FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type={props.type ?? "submit"}
            disabled={pending || props.disabled}
            aria-busy={pending}
            className={`bg-[#e49400] text-white hover:bg-amber-600 flex justify-center items-center py-2 px-6 gap-2 rounded transition-colors duration-200
        active:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed
        ${className}`}
        >
            {pending && (
                <span className="w-4 h-4 border-2 border-white rounded-full animate-spin border-b-white/70" />
            )}
            {children}
        </button>
    );
}
