import type { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EditProfile } from "./_components/edit-profile";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileOverview } from "./_components/profile-overview";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile",
  alternates: {
    canonical: "/dashboard/profile",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4" data-content-padding="false">
      <Breadcrumb className="px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span>Setting</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProfileHeader />

      <Tabs className="min-h-0 flex-1 gap-0" defaultValue="overview">
        <div className="scrollbar-none touch-pan-x overflow-x-auto overscroll-x-contain border-y">
          <TabsList
            className="w-max min-w-full justify-start gap-4 px-4 py-6.25 *:data-[slot=tabs-trigger]:flex-none"
            variant="line"
          >
            <TabsTrigger className="py-5" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger className="py-5" value="edit profile">
              Edit Profile
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-4 py-4 md:px-6">
          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>

          <TabsContent className="py-4" value="edit profile">
            <EditProfile />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
