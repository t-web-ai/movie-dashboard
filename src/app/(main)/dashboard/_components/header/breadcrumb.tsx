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
            <BreadcrumbItem>
              <span>{item}</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Container>
  );
}
