import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeComponent } from './employe.component'

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeComponent,
    children: [
      {
        path: '', 
        component: HomeComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
