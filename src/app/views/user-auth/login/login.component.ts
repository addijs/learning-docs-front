import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Static User for tests
  user: User = {
    email: 'adelso@gmail.com',
    password: '123',
  };

  inputEmail: string;
  inputPassword: string;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (
      this.inputEmail !== this.user.email ||
      this.inputPassword !== this.user.password
    ) {
      this.openSnackBar('Credenciais incorretas. Tente novamente.');
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
