import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from '@shared/crud_abstract';
import { Document } from '@shared/entities/document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends Crud<Document> {
  constructor(private http: HttpClient) {
    super('http://localhost:3333/documents', http);
  }

  getDocumentsByTopicId(topicId: number): Observable<Document[]> {
    return this.http.get<Document[]>(this.url + `?topic_id=${topicId}`);
  }
}
