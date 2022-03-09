import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   loadChildren: () =>
  //     import('@modules/home/home.module').then((m) => m.HomeModule),
  // },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
