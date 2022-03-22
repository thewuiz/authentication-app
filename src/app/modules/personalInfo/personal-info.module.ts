import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PersonalInfoComponent } from './pages/personal-info.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PersonalInfoComponent],
  imports: [CommonModule, PersonalInfoRoutingModule, SharedModule],
})
export class PersonalInfoModule {}
