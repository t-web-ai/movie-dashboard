import { Plus } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import type { Role } from "@/types/role";

import { Breadcrumb } from "../../../_components/header/breadcrumb";

interface AdminHeaderProps {
  status: string;
  handleStatus: (status: string) => void;
  handleSearch: (search: string) => void;
  search: string;
  roleItems?: Role[];
  role: string;
  handleRole: (role: string) => void;
  clearFilters: () => void;
  createdAfter: string;
  createdBefore: string;
  handleDate: (dateRange?: DateRange) => void;
  openCreateAdminPage: () => void;
}

const statusItems = [
  { id: 1, value: "all", label: "All Status" },
  { id: 2, value: "active", label: "Active" },
  { id: 3, value: "suspend", label: "Suspend" },
];

export function AdminHeader({
  status,
  handleStatus,
  handleSearch,
  search,
  roleItems,
  role,
  handleRole,
  clearFilters,
  createdAfter,
  createdBefore,
  handleDate,
  openCreateAdminPage,
}: AdminHeaderProps) {
  const hasCreatePermission = useCheckPermission("admin", "create");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between">
        <Breadcrumb items={["Setting"]} currentPage="Admin Management" />
        <div className="flex gap-2">
          <Button onClick={openCreateAdminPage} disabled={!hasCreatePermission}>
            Create New <Plus />
          </Button>
          <Button onClick={clearFilters} variant="secondary">
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div>
          <Select value={status} onValueChange={handleStatus}>
            <SelectTrigger className="h-10 w-full" id="admin-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusItems.map((statusItem) => (
                  <SelectItem key={statusItem.id} value={statusItem.value}>
                    {statusItem.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
