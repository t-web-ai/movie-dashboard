import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface TableColumn<T> {
  label: string;
  render: ({ item, index }: { item: T; index: number }) => React.ReactNode;
}

export interface TableComponentProps<T> {
  headers: TableColumn<T>[];
  items: T[];
}

export function TableComponent<T>({ headers, items }: TableComponentProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.label}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item, index) => {
          const key = `#${index}`;
          return (
            <TableRow key={key}>
              {headers.map((header) => (
                <TableCell key={String(header.label)}>{header.render({ item, index })}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
