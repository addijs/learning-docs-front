import { Component, OnInit } from '@angular/core';
import { User } from '@shared/entities/user';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from "@services/auth.service";
import { UserFirestoreService } from '@services/user-firestore.service';
import { mergeMap, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

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
  hide: boolean;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userService: UserFirestoreService,
    private router: Router
  ) {
    this.user = new User();
    this.hide = true;
  }

  ngOnInit(): void {

  }

  login(): void {
    const credentials = {
      email: this.user.email,
      password: this.user.password
    }

    // this.userService.logIn(credentials).subscribe(async ([storedUser]) => {
    //   if (!storedUser) {
    //     this.openSnackBar('Este usuário não existe');
    //     return;
    //   }
    //
    //   if (this.user.password !== storedUser.password) {
    //     this.openSnackBar('Senha incorreta');
    //     return;
    //   }
    //
    //   delete storedUser.password;
    //
    //   this.authService.onUserLoggedIn(storedUser);
    //   localStorage.setItem('learning-docs-user', JSON.stringify(storedUser));
    //
    //   await this.router.navigate(['/main']);
    // });

    this.userService.logIn(credentials).pipe(
        switchMap(([storedUser]) => {
            if (!storedUser) {
              this.openSnackBar('Este usuário não existe');
              return;
            }

            if (this.user.password !== storedUser.password) {
              this.openSnackBar('Senha incorreta');
              return;
            }

            delete storedUser.password;
            this.authService.onUserLoggedIn(storedUser);
            localStorage.setItem('learning-docs-user', JSON.stringify(storedUser));

            return of(storedUser);
        }),
        switchMap(user => this.userService.setLoggedAt(user)),
        take(1)
    ).subscribe(async () => {
        await this.router.navigate(['/main']);
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', this.snackBarConfig);
  }
}
