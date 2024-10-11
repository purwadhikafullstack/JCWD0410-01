import { IconType } from "react-icons";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: IconType;
  }>;
}
