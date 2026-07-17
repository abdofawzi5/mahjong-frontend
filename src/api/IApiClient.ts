export interface IApiClient {
  get<T>(url: string, config?: unknown): Promise<{ data: T }>;
  post<T>(url: string, data?: unknown, config?: unknown): Promise<{ data: T }>;
}
