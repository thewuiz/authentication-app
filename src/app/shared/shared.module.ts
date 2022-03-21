import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalImageComponent } from './components/modal-image/modal-image.component';

@NgModule({
  declarations: [NavbarComponent, SpinnerLoadingComponent, ModalImageComponent],
  exports: [NavbarComponent, SpinnerLoadingComponent, ModalImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
