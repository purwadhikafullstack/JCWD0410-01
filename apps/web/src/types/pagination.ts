export interface IPaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface IPageableResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface IPaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}