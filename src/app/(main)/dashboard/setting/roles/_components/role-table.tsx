import type { Role } from "@/types/role";

import type { TableColumn } from "../../../_components/table/table-component";
import { RoleTableAction } from "./role-table-action";

export const RoleTableColumns: TableColumn<Role & { type: "custom" | "system" }>[] = [
  {
    label: "No.",
    render: ({ index }) => {
      return <div className="px-2 font-semibold">{index + 1}</div>;
    },
  },
  {
    label: "Name",
    render: ({ item }) => {
      return <div>{item.name}</div>;
    },
  },
  {
    label: "Type",
    render: ({ item }) => {
      return <div className="capitalize">{item.type}</div>;
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
    label: "Actions",
    render: ({ item }) => {
      return <RoleTableAction id={item._id} type={item.type} />;
    },
  },
];
