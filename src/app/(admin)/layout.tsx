"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminProvider, useAdmin } from "../context/admin-context";
import { ModeToggle } from "@/components/mode-toggle";
import Clock from "@/components/clock";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // AdminProvider must wrap any component that uses useAdmin
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}

function AdminLayoutContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const pathname = usePathname();

  const { admin } = useAdmin();

  const owner = admin?.owner;

  // const formatPath = (path: string) => {
  //   const segments = path.split("/").filter(Boolean);
  //   const last = segments[segments.length - 1] ?? "Dashboard";

  //   let formatted = last
  //     .replace(/-/g, " ")
  //     .replace(/\b\w/g, (char) => char.toUpperCase());

  //   if (formatted.startsWith("Admin ")) {
  //     formatted = formatted.slice(6); // Remove "Admin " prefix if it exists
  //   }

  //   return formatted;
  // };

  // const currentPage = formatPath(pathname);

  return (
    <AdminProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Clock />
          <header className="flex shrink-0 items-center justify-between px-6 pt-1 pb-5">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-lg font-medium">
                      {/* {currentPage} */}
                      Welcome,{" "}
                      <span className="text-xl font-semibold italic">
                        {" "}
                        {owner}
                      </span>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>
              <ModeToggle />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 px-5 py-4 md:px-10">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AdminProvider>
  );
}
