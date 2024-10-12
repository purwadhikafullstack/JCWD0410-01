import { cn } from "@/lib/utils";
import { FC } from "react";
import { IconType } from "react-icons";
import { Button, ButtonProps } from "./ui/button";
import { SheetClose } from "./ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  icon?: IconType;
}

const SidebarButton: FC<SidebarButtonProps> = ({
  icon: Icon,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      className={cn("justify-start gap-2 font-normal", className)}
      {...props}
    >
      {Icon && <Icon size={17} />}
      <span>{children}</span>
    </Button>
  );
};

export default SidebarButton;

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
