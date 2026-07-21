import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({
  children,
}: SectionTitleProps) {
  return (
    <h2 className="mb-8 text-center text-4xl font-bold">
      {children}
    </h2>
  );
}