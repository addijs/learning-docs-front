import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crud } from 'app/shared/crud_abstract';
import { Topic } from '@shared/entities/topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends Crud<Topic> {
  constructor(private http: HttpClient) {
    super('http://localhost:3333/topics', http);
  }

  static emitSelectedTopic = new EventEmitter<number>();

  getTopicsByUserId(userId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url + `?user_id=${userId}`);
  }
}
