import { variantClasses } from "./types";

interface Props {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Badge({ variant = "primary", className = "" }: Props) {
  return (
    <span
      className={[
        "text-xs px-2 py-1 rounded-full inline-flex items-center",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      <slot />
    </span>
  );
}
