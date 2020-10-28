import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, MatSnackBarModule],
})
export class LoginModule {}
