import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { IndexComponent } from './components/index/index.component';
import { HomeModule } from '../home/home.module';
import { HttpService } from 'src/app/services/http.service';



@NgModule({
  declarations: [
    FormComponent,
    IndexComponent
  ],
  imports: [
    HomeModule,
    CommonModule
  ],
  providers: [
    HttpService
  ]
})
export class EnterprisesModule { }
