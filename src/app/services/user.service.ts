import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/entities/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private APP_URL: string = 'http://localhost:3333/users';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.APP_URL, user);
  }

  login(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.APP_URL + `?email=${email}`);
  }
}
