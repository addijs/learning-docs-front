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
    // super('/topic-video', http);
    super('/videos', http);
  }

  getVideosByTopicId(topicId: number): Observable<Video[]> {
    // return this.http.get<Video[]>(`${this.url}/list?topicID=${topicId}`);
    return this.http.get<Video[]>(this.url + `?topic_id=${topicId}`);
  }
}
