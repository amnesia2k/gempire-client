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
import { ModeToggle } from "@/components/mode-toggle";
// import Clock from "@/components/clock";
// import { useAdmin } from "@/context/admin-context";

export function AdminLayoutContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const { admin } = useAdmin();
  // const owner = admin?.owner;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <Clock /> */}
        <header className="flex shrink-0 items-center justify-between px-6 py-5">
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
                    Welcome,
                    {/* <span className="text-xl font-semibold italic">
                      {owner}
                    </span> */}
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
  );
}
