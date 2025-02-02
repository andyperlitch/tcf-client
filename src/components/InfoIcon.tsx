import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function InfoIcon({
  children,
  icon: Icon,
  className,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon
          className={`
            h-4 w-4

            ${className}
          `}
        />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
