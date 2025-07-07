// @/components/app-sidebar.tsx - MODIFIED CODE
"use client";

import * as React from "react";
import { Package, LayoutDashboard, ShoppingBag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // Import useSidebar hook
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

  // Access sidebar state and setters from the context
  const { isMobile, setOpen, setOpenMobile } = useSidebar();

  const user = {
    name: admin?.owner ?? "Admin User",
    // avatar: "/placeholders/avatar.png",
  };

  // Function to close the sidebar based on device type
  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      // For desktop, if the sidebar is 'offcanvas' or simply
      // not in 'icon' mode, we might want to close it or just keep it open.
      // Given the request to "close the sidebar", we'll default to closing
      // the expanded state if it's not mobile.
      // If your desktop sidebar also has an 'offcanvas' state controlled by 'open',
      // setting 'open(false)' will close it. If it's a persistent sidebar that
      // just collapses to an icon, you might not want to close it entirely.
      // For now, we'll assume 'setOpen(false)' is the desired action
      // for an expanded desktop sidebar.
      setOpen(false);
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* Add onClick to close sidebar */}
              <Link href="/" onClick={closeSidebar}>
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
                  {/* Add onClick to close sidebar */}
                  <Link href={item.href} onClick={closeSidebar}>
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
