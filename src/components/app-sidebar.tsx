"use client";

import * as React from "react";
import { Package, LayoutDashboard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { useAdmin } from "@/context/admin-context";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin-product",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin-order",
    icon: ShoppingBag,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { admin, isLoading } = useAdmin();
  const { isMobile, setOpenMobile } = useSidebar();

  const user = {
    name: admin?.owner ?? "Admin User",
  };

  // Only close sidebar on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" onClick={handleLinkClick}>
                <div className="grid flex-1 pl-8 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gempire</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="space-y-3 px-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`px-5 py-5 ${isActive ? "bg-accent text-accent-foreground" : ""}`}
                >
                  <Link href={item.href} onClick={handleLinkClick}>
                    <item.icon className="text-[18px]" />
                    <span className="text-[18px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>{!isLoading && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
