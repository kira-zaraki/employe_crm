import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../pages/auth/guard/auth.guard';

import { EmployeService } from './employe/employe.service';
import { AdminService } from './admin/admin.service';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    },
    resolve  : {
        user: AdminService
    },
    loadChildren: () => import('./admin/admin.module').then(m=> m.AdminModule)
  },
  {
    path: 'employe',
    canActivate: [AuthGuard],
    data: {
      role: 'employe'
    },
    resolve  : {
        user: EmployeService
    },
    loadChildren: () => import('./employe/employe.module').then(m=> m.EmployeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
