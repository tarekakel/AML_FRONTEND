export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  errors: string[];
  status: number;
  timestamp: string;
  traceId: string;
  version: string;
  meta: PaginationMeta;
  links: PaginationLinks;

}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;

}

export interface PaginationLinks {
  next: string | null;
  prev: string | null;
}
/** Reusable shape for any ID–Name pair */
export interface LookupItem {
  id: number;
  name: string;
}
/** Holds all lookup arrays returned by the API */
export interface LookupMaster {
  id_types: LookupItem[];
  nationalities: LookupItem[];
  customer_types: LookupItem[];
  cor_roles: LookupItem[];
}



