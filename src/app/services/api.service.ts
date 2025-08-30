import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, });
  }



  getFiles(endpoint: string, params?: HttpParams) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params, responseType: 'blob' });
  }
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }


  getBlobWithHeaders(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams; withCredentials?: boolean }
  ): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      ...options,
      responseType: 'blob' as const,
      observe: 'response' as const,

    });
  }

}
