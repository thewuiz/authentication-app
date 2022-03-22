import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectRoutingModule } from './redirect-routing.module';
import { RedirectComponent } from './pages/redirect.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RedirectComponent],
  imports: [CommonModule, RedirectRoutingModule, SharedModule],
})
export class RedirectModule {}
