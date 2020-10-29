import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
