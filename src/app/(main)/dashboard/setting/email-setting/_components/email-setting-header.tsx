import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Breadcrumb } from "../../../_components/header/breadcrumb";

export function EmailSettingHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Breadcrumb items={["Setting"]} currentPage="Email Setting" />
      <Button asChild className="w-30">
        <Link href="/dashboard/setting/email-setting/test">Test Email</Link>
      </Button>
    </div>
  );
}
