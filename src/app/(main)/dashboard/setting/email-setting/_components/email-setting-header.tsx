import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Breadcrumb } from "../../../_components/header/breadcrumb";

export function EmailSettingHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Breadcrumb items={["Setting"]} currentPage="Email Setting" />

      <Button variant={"outline"} className="flex gap-2 text-blue-500" asChild>
        <Link href="/dashboard/setting/email-setting/test">
          <div>Test Email</div>
          <ChevronRight />
        </Link>
      </Button>
    </div>
  );
}
