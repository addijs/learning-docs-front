import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  user: User;

  constructor(private snackBar: MatSnackBar, private service: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {}

  login(): void {
    this.service.login(this.user.email).subscribe(([storedUser]) => {
      if (!storedUser) {
        this.openSnackBar('Este usuário não existe');
      }

      if (this.user.password !== storedUser.password) {
        this.openSnackBar('Senha incorreta');
      }

      console.log(storedUser);
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', this.snackBarConfig);
  }
}
