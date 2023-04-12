import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

import { SignUpService } from './pages/auth/sign-up/sign-up.service';

const routes: Routes = [
    {
      path: '', 
      pathMatch : 'full', 
      redirectTo: 'employe'},
    {
      path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m=> m.DashboardModule)
    },
    {
      path: 'sign-in',
      component: SignInComponent
    },
    {
      path: 'sign-up/:invitation',
      component: SignUpComponent,
      resolve:{
        employe: SignUpService
      }
    },
     {path: '404', component: NotFoundComponent},
     {path: '**', redirectTo: '/404'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
