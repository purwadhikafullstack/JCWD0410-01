"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  total: number;
  limit: number;
  onChangePage: ({ selected }: { selected: number }) => void;
  page: number;
}

const Pagination: FC<PaginationProps> = ({
  total,
  limit,
  onChangePage,
  page,
}) => {
  return (
    <ReactPaginate
      breakLabel={<span></span>}
      nextLabel={<ChevronRight size={20} />}
      previousLabel={<ChevronLeft size={20} />}
      pageCount={Math.ceil(total / limit)}
      renderOnZeroPageCount={null}
      containerClassName="flex gap-4 mt-3 w-fit items-center"
      pageLinkClassName="py-1 px-2 rounded-md"
      activeLinkClassName="border-[1px] border-neutral-300"
      onPageChange={onChangePage}
      forcePage={Number(page) - 1}
    />
  );
};

export default Pagination;
