import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axiosInstance: AxiosInstance = axios;

  async get<T>(url: string, config?: any): Promise<T> {
    try {
      return await this.axiosInstance
        .get<T>(url, config)
        .then((response) => response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
      throw new Error(`Failed to fetch data from ${url}`);
    }
  }

  async post<T>(url: string, data: any, config?: any): Promise<T> {
    try {
      return await this.axiosInstance
        .post<T>(url, data, config)
        .then((response) => response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
      throw new Error(`Failed to post data to ${url}`);
    }
  }

  async put<T>(url: string, data: any, config?: any): Promise<T> {
    try {
      return await this.axiosInstance
        .put<T>(url, data, config)
        .then((response) => response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
      throw new Error(`Failed to update data at ${url}`);
    }
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    try {
      return await this.axiosInstance
        .delete<T>(url, config)
        .then((response) => response.data);
    } catch (error) {
      console.error('Error making DELETE request:', error);
      throw new Error(`Failed to delete data at ${url}`);
    }
  }
}
