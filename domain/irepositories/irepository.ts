import { Pagination } from "../../types/pagination";

export interface IRepositories<T> {
  getAll(pagination: Pagination): Promise<T[]>;
  getById(id: string): Promise<T | null>;
}
