import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { departmentsRoutes } from './modules/departments/departments.routing';
import { employeesRoutes } from './modules/employees/employees.routing';
import { enterprisesRoutes } from './modules/enterprises/enterprises.routing';

const routes: Routes = [
  ...enterprisesRoutes,
  ...departmentsRoutes,
  ...employeesRoutes,
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
