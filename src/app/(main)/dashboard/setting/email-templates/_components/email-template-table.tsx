import type { EmailTemplate } from "@/types/email-template";

import type { TableColumn } from "../../../_components/table/table-component";
import { EmailTemplateTableAction } from "./email-template-table-action";

export const EmailTemplateTableColumns: TableColumn<EmailTemplate>[] = [
  {
    label: "No.",
    render: ({ index }) => {
      return <div className="px-2 font-semibold">{index + 1}</div>;
    },
  },
  {
    label: "Type",
    render({ item }) {
      return <div>{item?.type?.split?.("_")?.join(" ") ?? "-"}</div>;
    },
  },
  {
    label: "Created At",
    render({ item }) {
      if (!item?.createdAt) return "-";
      return (
        <div className="capitalize">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    label: "Action",
    render({ item }) {
      if (!item?._id) return null;
      return <EmailTemplateTableAction id={item._id} />;
    },
  },
];
