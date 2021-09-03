import { CrudFirestore } from "@shared/crud_abstract_firestore";
import { Document } from "@shared/entities/document";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentFirestoreService extends CrudFirestore<Document> {
    constructor(
        protected db: AngularFirestore,
    ) {
        super('documents', db);
    }

    getDocumentsByTopicId(topicId: number): Observable<Document[]> {
        return this.db.collection<Document>(this.collectionName, ref => {
            return ref.where('topicId', '==', topicId);
        }).valueChanges({ idField: 'id' });
    }
}