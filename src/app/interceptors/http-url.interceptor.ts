import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${environment.baseURL}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
      req = req.clone({ url });
    }

    return next.handle(req);
  }
}
