import { Breadcrumb } from "../../../_components/header/breadcrumb";

export function EmailTemmplateHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <Breadcrumb items={["Setting"]} currentPage="Email Template Management" />
    </div>
  );
}
