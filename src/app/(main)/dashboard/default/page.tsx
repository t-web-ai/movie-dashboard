import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Default Page",
  description: "Manage dashbaord with powerful and smooth user interface",
  alternates: {
    canonical: "/dashboard/default",
  },
};

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="relative w-fit rounded-2xl rounded-bl-md bg-gray-200 px-5 py-2 before:absolute before:-bottom-2 before:left-1 before:h-3 before:w-4 before:-rotate-90 before:rounded-bl-full before:bg-gray-200 before:content-['']">
        Welcome back
      </div>
    </div>
  );
}
