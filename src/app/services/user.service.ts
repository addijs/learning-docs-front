import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/entities/user';
import { HttpClient } from '@angular/common/http';

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:3333/users';

  constructor(private httpClient: HttpClient) { }

  logIn(credentials: LoginData): Observable<User[]> {
    const { email, password } = credentials;
    // return this.httpClient.post<User>(`${this.url}/login`, { email, password });
    return this.httpClient.get<User[]>(this.url + `?email=${email}`);
  }

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
}
