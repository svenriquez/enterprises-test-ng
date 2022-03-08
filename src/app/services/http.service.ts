import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getItems(module: string, size: string, pageNumber: string) {
    let params = new HttpParams();
    params = (size != undefined && size != null) ? params.append('size', size) : params;
    params = (pageNumber != undefined && pageNumber != null) ? params.append('pageNumber', pageNumber) : params;

    return this.httpClient.get(`/${module}/get-all/`, { params });
  }

  getMetadatos(id: any, module: any) {
    if (id) {
      return this.httpClient.get(`/${module}/get-form-data?id=${id}`);
    }

    return this.httpClient.get(`/${module}/get-form-data`);
  }

  getItem(id: any, module: any) {
    return this.httpClient.get(`/${module}/${id}`);
  }

  postItem(object: any, module: any) {
    return this.httpClient.post(`/${module}`, object);
  }

  putItem(id:any, object: any, module: any) {
    return this.httpClient.put(`/${module}?id=${id}`, object);
  }

  deleteItems(module: string, ids: any[]) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: ids
    };

    return this.httpClient.delete(`/${module}`, options);
  }

}
