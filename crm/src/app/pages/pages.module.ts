import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up/sign-up.component';

import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';


@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
