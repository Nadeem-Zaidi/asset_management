export type Pagination = {
  whereClause: string;
  sortKey: string;
  sortOrder: String;
  params: string[];
  pageSize: number;
  offset: number;
};
