import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, SharedModule],
})
export class SignupModule {}
