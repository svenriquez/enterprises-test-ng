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

  getItems(module: string, size: number, pageNumber: number, textFilter: string) {
    let params = new HttpParams();
    params = (size != undefined && size != null) ? params.append('size', size + '') : params;
    params = (pageNumber != undefined && pageNumber != null) ? params.append('pageNumber', pageNumber + '') : params;
    params = (textFilter != undefined && textFilter != null) ? params.append('textFilter', textFilter) : params;

    return this.httpClient.get(`/${module}/get-all/`, { params });
  }

  getMetadatos(id: any, module: any) {
    if (id) {
      return this.httpClient.get(`/${module}/get-form-data?id=${id}`);
    }

    return this.httpClient.get(`/${module}/get-form-data`);
  }

  getItem(id: any, module: any) {
    return this.httpClient.get(`/${module}/get-by-id/${id}`);
  }

  postItem(object: any, module: any) {
    return this.httpClient.post(`/${module}/post`, object);
  }

  putItem(object: any, module: any) {
    return this.httpClient.put(`/${module}/update`, object);
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

  getDepartmentsByIdEnterprise(id: any, module: any) {
    return this.httpClient.get(`/${module}/get-departments-by-idEnterprise/${id}`);
  }

}
