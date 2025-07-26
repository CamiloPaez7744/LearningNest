import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export class PokeApiAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);
    return data;
  }

  async post<T>(url: string, body: any): Promise<T> {
    const { data } = await this.axios.post<T>(url, body);
    return data;
  }

  async patch<T>(url: string, body: any): Promise<T> {
    const { data } = await this.axios.patch<T>(url, body);
    return data;
  }

  async delete<T>(url: string): Promise<T> {
    const { data } = await this.axios.delete<T>(url);
    return data;
  }
}
