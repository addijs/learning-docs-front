import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from '@shared/crud_abstract';
import { Video } from '@shared/entities/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService extends Crud<Video> {
  constructor(private http: HttpClient) {
    super('https://learning-docs.herokuapp.com/topic-video', http);
  }

  getVideosByTopicId(topicId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.url}/list?topicID=${topicId}`);
  }
}
