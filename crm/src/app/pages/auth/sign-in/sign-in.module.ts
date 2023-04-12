import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInService } from './sign-in.service';

import { SignInComponent } from './sign-in.component';

import { httpInterceptorProviders } from '../../../interceptor/http-client-interceptor';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    SignInService,
    httpInterceptorProviders
  ]
})
export class SignInModule { }
