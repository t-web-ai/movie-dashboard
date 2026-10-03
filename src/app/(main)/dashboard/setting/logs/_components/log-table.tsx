import type { Log } from "@/types/log";

import type { TableColumn } from "../../../_components/table/table-component";
import { LogTableAction } from "./log-table-action";

export const LogTableColums: TableColumn<Log>[] = [
  {
    label: "No.",
    render: ({ index }) => {
      return <div className="px-2 font-semibold">{index + 1}</div>;
    },
  },
  {
    label: "Name",
    render: ({ item }) => {
      return <div>{item?.admin?.name ?? "-"}</div>;
    },
  },
  {
    label: "Email",
    render: ({ item }) => {
      return <div>{item?.admin?.email ?? "-"}</div>;
    },
  },
  {
    label: "Role",
    render: ({ item }) => {
      return <div>{item?.admin?.role?.name ?? "-"}</div>;
    },
  },
  {
    label: "Agent",
    render: ({ item }) => {
      return <div>{item?.agent ?? "-"}</div>;
    },
  },
  {
    label: "IP Address",
    render: ({ item }) => {
      return <div>{item?.ip ?? "-"}</div>;
    },
  },
  {
    label: "Platform",
    render: ({ item }) => {
      return <div>{item?.platform ?? "-"}</div>;
    },
  },
  {
    label: "Action",
    render: ({ item }) => {
      return <div className="uppercase">{item?.action ?? "-"}</div>;
    },
  },
  {
    label: "Resource",
    render: ({ item }) => {
      return <div className="uppercase">{item?.resource ?? "-"}</div>;
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
    label: "Actions",
    render({ item }) {
      if (!item._id) return null;
      return <LogTableAction id={item._id} />;
    },
  },
];
