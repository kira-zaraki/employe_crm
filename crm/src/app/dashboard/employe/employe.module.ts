import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { EmployeComponent } from './employe.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../../shared/shared.module';
import { SignOutModule } from '../../components/sign-out/sign-out.module';


@NgModule({
  declarations: [
    EmployeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignOutModule,
    EmployeRoutingModule
  ]
})
export class EmployeModule { }
