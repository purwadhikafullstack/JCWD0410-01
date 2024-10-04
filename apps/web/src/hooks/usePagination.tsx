import { useState } from "react";

export function usePagination() {
  const [pagination, setPagination] = useState({
    pageSize: 8,
    pageIndex: 1,
  });
  const { pageSize, pageIndex } = pagination;

  return {
    limit: pageSize,
    onPaginationChange: setPagination,
    pagination,
    skip: pageSize * (pageIndex - 1),
  };
}