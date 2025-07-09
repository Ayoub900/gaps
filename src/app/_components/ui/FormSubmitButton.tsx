"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode;
    className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
    children,
    className,
    ...props
}: FormSubmitButtonProps) {

    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            className={`bg-[#050c45] flex flex-row justify-center items-center active:bg-[#050c45]/70 py-2 px-6 text-white gap-2 ${className}`}
            type="submit"
            disabled={pending}
        >
            {pending && <span className="min-w-4 min-h-4 w-4 h-4 border-2 border-white rounded-full animate-spin border-b-white/70 " />}
            {children}
        </button>
    );
}