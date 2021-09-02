import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGuard} from "@views/main/main.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@views/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@views/signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('@views/main/main.module').then(m => m.MainModule),
    canActivate: [MainGuard]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
