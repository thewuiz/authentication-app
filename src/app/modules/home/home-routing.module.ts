import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user/:id',
    loadChildren: () =>
      import('@modules/personalInfo/personal-info.module').then(
        (m) => m.PersonalInfoModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('@modules/editInfo/edit-info.module').then(
        (m) => m.EditInfoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
