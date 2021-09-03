import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from '@shared/crud_abstract';
import { Document } from '@shared/entities/document';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends Crud<Document> {
  // private API_URL: string = 'https://learning-docs.herokuapp.com'
  private readonly documentToEditSubject = new BehaviorSubject<Document>(null);
  readonly documentToEdit$ = this.documentToEditSubject.asObservable();

  constructor(private http: HttpClient) {
    // super('/topic-note', http);
    super('/documents', http);
  }

  setDocumentToEdit(document: Document): void {
    this.documentToEditSubject.next(document);
  }

  getDocumentsByTopicId(topicId: number): Observable<Document[]> {
    // return this.http.get<Document[]>(`${this.url}/list?topicID=${topicId}`);
    return this.http.get<Document[]>(this.url + `?topic_id=${topicId}`);
  }
}
