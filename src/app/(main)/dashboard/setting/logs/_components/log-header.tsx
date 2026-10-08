import { cn } from "cn";
import type { DateRange } from "react-day-picker";

import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import type { Role } from "@/types/role";

import { Breadcrumb } from "../../../_components/header/breadcrumb";

interface LogHeaderProps {
  type: "user" | "audit";
  handleType: (type: "user" | "audit") => void;
  search: string;
  handleSearch: (search: string) => void;
  createdAfter: string;
  createdBefore: string;
  handleDate: (dateRange?: DateRange) => void;
  roleItems?: Role[];
  role: string;
  handleRole: (role: string) => void;
  clearFilters: () => void;
  openDeleteAllLogsModal: (logType: "user" | "audit") => void;
}

const typeItems: {
  id: number;
  value: "user" | "audit";
  label: string;
}[] = [
  { id: 1, value: "user", label: "User Logs" },
  {
    id: 2,
    value: "audit",
    label: "Audit Logs",
  },
];

export function LogHeader({
  type,
  handleType,
  search,
  handleSearch,
  createdAfter,
  createdBefore,
  handleDate,
  role,
  handleRole,
  roleItems,
  clearFilters,
  openDeleteAllLogsModal,
}: LogHeaderProps) {
  const hasDeletePermission = useCheckPermission("log", "delete");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between">
        <Breadcrumb items={["Setting"]} currentPage="Log Management" />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              openDeleteAllLogsModal(type);
            }}
            variant="destructive"
            disabled={!hasDeletePermission}
          >
            Delete All <span className="capitalize">{type}</span> Logs
          </Button>
          <Button onClick={clearFilters} variant="secondary">
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {typeItems.map((typeItem) => (
            <Button
              key={typeItem.id}
              variant="outline"
              className={cn("cursor-pointer", {
                "bg-green-700 text-white dark:bg-green-700": type === typeItem.value,
              })}
              onClick={() => handleType(typeItem.value)}
            >
              {typeItem.label}
            </Button>
          ))}
        </div>
        <div>
          <Select value={role} onValueChange={handleRole}>
            <SelectTrigger className="h-10 w-full" id="admin-role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All roles</SelectItem>
                {roleItems?.map((roleItem) => (
                  <SelectItem key={roleItem._id} value={roleItem._id}>
                    <div className="capitalize">{roleItem.name}</div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grow">
          <Input
            placeholder="Enter name or email"
            name="search"
            id="search"
            value={search}
            onChange={(event) => {
              handleSearch(event.target.value.trim());
            }}
          />
        </div>
        <div>
          <DateRangePicker
            value={{
              from: createdAfter ? new Date(createdAfter) : undefined,
              to: createdBefore ? new Date(createdBefore) : undefined,
            }}
            onChange={handleDate}
          />
        </div>
      </div>
    </div>
  );
}
