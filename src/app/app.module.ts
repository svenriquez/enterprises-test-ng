import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { getPaginatorInitial } from './services/init-paginator';
import { EnterprisesModule } from './modules/enterprises/enterprises.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EmployeesModule } from './modules/employees/employees.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EnterprisesModule,
    DepartmentsModule,
    EmployeesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      enableHtml: true
    })
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorInitial() },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


