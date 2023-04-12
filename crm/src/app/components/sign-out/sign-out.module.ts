import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignOutComponent } from './sign-out.component';


@NgModule({
  declarations: [
    SignOutComponent
  ],
  exports:[
    SignOutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SignOutModule { }
