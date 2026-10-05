import { Fragment } from "react/jsx-runtime";

import {
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as Container,
} from "@/components/ui/breadcrumb";

interface BreadCrumbProps {
  items: string[];
  currentPage: string;
}
export function Breadcrumb({ items, currentPage }: BreadCrumbProps) {
  return (
    <Container>
      <BreadcrumbList>
        {items.map((item) => (
          <Fragment key={item}>
            <BreadcrumbItem className="cursor-default">
              <span>{item}</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem className="cursor-default">
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Container>
  );
}
