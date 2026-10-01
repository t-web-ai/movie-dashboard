import { cn } from "cn";
import { DotIcon } from "lucide-react";

import type { Admin } from "@/types/admin";

import type { TableColumn } from "../../../_components/table/table-component";
import { AdminTableAction } from "./admin-table-action";

export const AdminTableColumns: TableColumn<Admin>[] = [
  {
    label: "No.",
    render: ({ index }) => {
      return <div className="px-2 font-semibold">{index + 1}</div>;
    },
  },
  {
    label: "Name",
    render({ item }) {
      return <div>{item.name}</div>;
    },
  },
  {
    label: "Email",
    render({ item }) {
      return <div>{item.email}</div>;
    },
  },
  {
    label: "Role",
    render({ item }) {
      return <div className="capitalize">{item.role.name}</div>;
    },
  },
  {
    label: "Status",
    render({ item }) {
      return (
        <DotIcon
          className={cn("size-16 text-muted-foreground", {
            "text-green-600": item.status === "active",
          })}
        />
      );
    },
  },
  {
    label: "Created At",
    render({ item }) {
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
      return <AdminTableAction id={item._id} />;
    },
  },
];
