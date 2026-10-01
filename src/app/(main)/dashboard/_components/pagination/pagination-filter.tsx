import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CustomPagination } from "./custom-pagination";

interface PaginationFilterProps {
  totalPages: number;
  page: number;
  foundCount: number;
  totalCount: number;
  handlePage: (page: number) => void;
  limit: number;
  handleLimit: (limit: number) => void;
}

const limitItems = [
  { id: 1, value: "2", label: "2" },
  { id: 2, value: "5", label: "5" },
  { id: 3, value: "10", label: "10" },
  { id: 4, value: "20", label: "20" },
  { id: 5, value: "30", label: "30" },
  { id: 6, value: "50", label: "0" },
];

export function PaginationFilter({
  totalPages,
  page,
  handlePage,
  limit,
  handleLimit,
  foundCount,
  totalCount,
}: PaginationFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CustomPagination totalPages={totalPages} page={page} handlePageChange={handlePage} />
      </div>
      <div className="text-sm">
        {foundCount} of {totalCount}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">Page Size</div>
        <div>
          <Select value={limit.toString()} onValueChange={(value) => handleLimit(parseInt(value, 10))}>
            <SelectTrigger className="h-10 w-full" id="admin-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {limitItems.map((limitItem) => (
                  <SelectItem key={limitItem.id} value={limitItem.value}>
                    {limitItem.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
