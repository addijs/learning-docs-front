import { CrudFirestore } from "@shared/crud_abstract_firestore";
import { Document } from "@shared/entities/document";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentFirestoreService extends CrudFirestore<Document> {
    private readonly documentToEditSubject = new BehaviorSubject<Document>(null);
    readonly documentToEdit$ = this.documentToEditSubject.asObservable();

    constructor(
        protected db: AngularFirestore,
    ) {
        super('documents', db);
    }

    setDocumentToEdit(document: Document): void {
        this.documentToEditSubject.next(document);
    }

    getDocumentsByTopicId(topicId: number): Observable<Document[]> {
        return this.db.collection<Document>(this.collectionName, ref => {
            return ref.where('topicId', '==', topicId);
        }).valueChanges({ idField: 'id' });
    }
}