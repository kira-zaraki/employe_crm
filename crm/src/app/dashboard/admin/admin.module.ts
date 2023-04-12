import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanieModule } from './companie/companie.module';
import { InvitationModule } from './invitation/invitation.module';
import { EmployeModule } from './employe/employe.module';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { SignOutModule } from '../../components/sign-out/sign-out.module';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule, 
    CompanieModule,
    InvitationModule,
    EmployeModule,
    SignOutModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
