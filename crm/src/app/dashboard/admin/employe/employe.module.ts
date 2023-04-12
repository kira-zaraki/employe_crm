import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { EmployeComponent } from './employe.component';





@NgModule({
  declarations: [
    EmployeComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
  ]
})
export class EmployeModule { }
