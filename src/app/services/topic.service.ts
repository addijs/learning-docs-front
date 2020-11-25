import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crud } from 'app/shared/crud_abstract';
import { Topic } from '@shared/entities/topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends Crud<Topic> {
  private APP_URL = 'http://localhost:3333/topic';

  constructor(private http: HttpClient) {
    super('http://localhost:3333/topic', http);
  }

  getTopicsByUserId(userId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.APP_URL + `?user_id=${userId}`);
  }
}
