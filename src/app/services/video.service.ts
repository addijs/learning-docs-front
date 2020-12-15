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
    super('http://localhost:3333/videos', http);
  }

  getVideosByUserId(userId: number): Observable<Video[]> {
    return this.http.get<Video[]>(this.url + `?user_id=${userId}`);
  }
}
