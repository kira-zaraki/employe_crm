import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { CreateInvitationComponent } from './dialog/create-invitation/create-invitation.component';
import { InvitationComponent } from './invitation.component';





@NgModule({
  declarations: [
    InvitationComponent,
    CreateInvitationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class InvitationModule { }
