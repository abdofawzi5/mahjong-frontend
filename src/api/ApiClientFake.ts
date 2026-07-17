import type { IApiClient } from './IApiClient';

export class ApiClientFake implements IApiClient {
  public mockResponses: Record<string, any> = {};
  public calls: Array<{ method: string; url: string; data?: any }> = [];

  setMockResponse(url: string, data: any) {
    this.mockResponses[url] = data;
  }

  async get<T>(url: string): Promise<{ data: T }> {
    this.calls.push({ method: 'GET', url });
    if (this.mockResponses[url] !== undefined) {
      return { data: this.mockResponses[url] as T };
    }
    throw new Error(`No mock response configured for GET ${url}`);
  }

  async post<T>(url: string, data?: any): Promise<{ data: T }> {
    this.calls.push({ method: 'POST', url, data });
    if (this.mockResponses[url] !== undefined) {
      return { data: this.mockResponses[url] as T };
    }
    throw new Error(`No mock response configured for POST ${url}`);
  }
}
