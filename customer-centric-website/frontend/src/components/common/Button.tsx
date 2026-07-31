import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}