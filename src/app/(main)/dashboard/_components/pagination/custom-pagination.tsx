import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";

export function CustomPagination({
  totalPages,
  handlePageChange,
  page,
}: {
  totalPages: number;
  handlePageChange: (page: number) => void;
  page: number;
}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <div className="cursor-pointer">
          <ChevronRight className="size-5" />
        </div>
      }
      previousLabel={
        <div className="cursor-pointer">
          <ChevronLeft className="size-5" />
        </div>
      }
      onPageChange={({ selected }) => {
        handlePageChange(selected + 1);
      }}
      pageRangeDisplayed={1}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      forcePage={Math.min(Math.max(0, page - 1), totalPages - 1)}
      containerClassName="flex items-center gap-3"
      pageClassName="flex text-sm items-center"
      pageLinkClassName="px-3 py-1 cursor-pointer"
      activeClassName="font-medium"
      disabledClassName="opacity-50"
      previousClassName="inline-flex items-center cursor-pointer"
      nextClassName="inline-flex items-center cursor-pointer"
    />
  );
}
