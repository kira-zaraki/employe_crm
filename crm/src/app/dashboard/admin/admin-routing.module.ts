import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component'

import { HomeComponent } from './home/home.component';
import { CompanieComponent } from './companie/companie.component';
import { InvitationComponent } from './invitation/invitation.component';
import { EmployeComponent } from './employe/employe.component';

import { CompanieService } from './companie/companie.service';
import { InvitationService } from './invitation/invitation.service';
import { EmployeService } from './employe/employe.service';
import { HomeService } from './home/home.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '', 
        component: HomeComponent,
        resolve  : {
            mainData: HomeService
        }
      },
      {
        path: 'companie',
        component: CompanieComponent,
        resolve  : {
            companies: CompanieService
        }
      },
      {
        path: 'invitation',
        component: InvitationComponent,
        resolve  : {
            invitations: InvitationService
        }
      },
      {
        path: 'employe',
        component: EmployeComponent,
        resolve  : {
            employes: EmployeService
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
