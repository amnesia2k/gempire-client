"use client";

import * as React from "react";
import { Package, Command, LayoutDashboard, ShoppingBag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const user = {
    name: admin?.owner ?? "Admin User",
    // avatar: "/placeholders/avatar.png", // you can swap with any placeholder service like https://i.pravatar.cc/150
  };

  // console.log(admin?.owner, "admin owner");

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
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
                  <Link href={item.href}>
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
