// Define Burger Line props
interface BurgerLineProps {
  isToggled: boolean;
  index: 1 | 2 | 3;
}

export const BurgerLine = ({ isToggled, index }: BurgerLineProps) => {
  const lineClass = `rounded block h-1 w-10 transition-all duration-300 ease-in-out ${isToggled ?  "bg-bittersweet" : "bg-space_cadet "}`;
  const transforms = [
    isToggled ? "rotate-45 translate-y-2" : "",
    isToggled ? "opacity-0" : "opacity-100",
    isToggled ? "-rotate-45 -translate-y-2" : "",
  ];
  return <span aria-label={`Mobile burger line ${index}`} className={`${lineClass} ${transforms[index - 1]}`}> </span>
};