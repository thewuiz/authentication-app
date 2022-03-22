import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInfoRoutingModule } from './edit-info-routing.module';
import { EditInfoComponent } from './pages/edit-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditInfoRoutingModule,
    SharedModule,
  ],
})
export class EditInfoModule {}
