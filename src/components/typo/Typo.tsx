import type { TypoProps } from "./types";
import { variantMap, colorToClass } from "./types";

export default function Typo({
  color = "dark",
  variant = "normal",
  font: overrideFont,
  className: propClassName = "",
  children,
}: TypoProps) {
  const { size, weight, font } = variantMap[variant] ?? variantMap.normal;
  const colorClass = colorToClass[color] ?? "text-dark";

  const classes = [
    overrideFont || font,
    colorClass,
    size,
    weight,
    "mb-2",
    propClassName,
  ]
    .filter(Boolean)
    .join(" ");

  switch (variant) {
    case "h1":
      return <h1 className={classes}>{children}</h1>;
    case "h2":
      return <h2 className={classes}>{children}</h2>;
    case "h3":
      return <h3 className={classes}>{children}</h3>;
    case "small":
      return <small className={classes}>{children}</small>;
    case "tertiary":
      return <span className={classes}>{children}</span>;
    default:
      return <p className={classes}>{children}</p>;
  }
}
