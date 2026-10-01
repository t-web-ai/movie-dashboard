import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
}

export function TableSkeleton({ rowCount = 3, columnCount = 5 }: TableSkeletonProps) {
  return (
    <div className="mt-4 animate-pulse space-y-3">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnCount }).map((_, index) => {
              const key = `#${index}`;
              return (
                <TableHead key={key}>
                  <Skeleton className="h-7 w-20" />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rowCount }).map((_, index) => {
            const key = `#${index}`;
            return (
              <TableRow key={key}>
                {Array.from({ length: columnCount }).map((_, index) => {
                  const key = `#${index}`;
                  return (
                    <TableCell key={key}>
                      <Skeleton className="h-7 w-full" />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSkeleton;
