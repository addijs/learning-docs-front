import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crud } from 'app/shared/crud_abstract';
import { Topic } from '@shared/entities/topic';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends Crud<Topic> {
  private readonly selectedTopicIdSubject = new BehaviorSubject<number>(null);
  readonly selectedTopicId$ = this.selectedTopicIdSubject.asObservable();

  constructor(private http: HttpClient) {
    // super('/topic', http);
    super('/topics', http);
  }

  handleSelectedTopic(topicId: number): void {
    this.selectedTopicIdSubject.next(topicId);
  }

  getTopicsByUserId(userId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url + `?user_id=${userId}`);
  }
}
