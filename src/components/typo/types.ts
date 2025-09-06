export type Color = "primary" | "secondary" | "tertiary" | "dark" | "light";
export type Variant = "h1" | "h2" | "h3" | "normal" | "small" | "tertiary";
export type Font = "font-primary" | "font-serif";

export interface TypoProps {
  color?: Color;
  variant?: Variant;
  font?: Font;
  className?: string;
  children?: React.ReactNode;
}

export const colorToClass = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  dark: "text-dark",
  light: "text-light",
} as const;

export const variantMap = {
  h1: { size: "text-2xl", weight: "font-semibold", font: "font-primary" },
  h2: { size: "text-xl", weight: "font-semibold", font: "font-primary" },
  h3: { size: "text-lg", weight: "font-semibold", font: "font-primary" },
  normal: {
    size: "text-md/loose",
    weight: "font-normal",
    font: "font-content",
  },
  small: { size: "text-sm", weight: "font-light", font: "font-primary" },
  tertiary: { size: "text-sm", weight: "font-normal", font: "font-primary" },
} as const;
