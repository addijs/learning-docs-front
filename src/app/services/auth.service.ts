import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from "@shared/entities/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedUserSubject = new BehaviorSubject<User>(null);
  readonly loggedUser$ = this.loggedUserSubject.asObservable();

  private readonly isLoggedInSubject = new BehaviorSubject(false);
  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  onUserLoggedIn(user: User): void {
    this.loggedUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  onUserLoggedOut(): void {
    localStorage.removeItem('learning-docs-user')
    this.loggedUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
}
