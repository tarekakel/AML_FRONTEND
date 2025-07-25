export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  errors: string[];
  status: number;
  timestamp: string;
  traceId: string;
  version: string;
}

