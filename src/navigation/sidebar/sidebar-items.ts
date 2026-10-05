import { LayoutDashboard, Logs, type LucideIcon, Mail, Settings, User, UserCog, Users } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        id: "default",
        title: "Home",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        id: "setting",
        title: "Setting",
        icon: Settings,
        subItems: [
          {
            id: "profile",
            title: "Profile",
            url: "/dashboard/setting/profile",
            icon: User,
          },
          {
            id: "admin",
            title: "Admin",
            url: "/dashboard/setting/admins",
            icon: Users,
          },
          {
            id: "role",
            title: "Role",
            url: "/dashboard/setting/roles",
            icon: UserCog,
          },
          {
            id: "log",
            title: "Log",
            url: "/dashboard/setting/logs",
            icon: Logs,
          },
          {
            id: "email-setting",
            title: "Email Setting",
            url: "/dashboard/setting/email-setting",
            icon: Mail,
          },
        ],
      },
    ],
  },
];
