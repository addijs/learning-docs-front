import { Injectable } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { Crud } from '@shared/crud_abstract_firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicFirestoreService extends Crud<Topic> {
  constructor(private angularFirestore: AngularFirestore) {
    super('topics', angularFirestore);
  }

  getTopicsByUserId(userId: string): Observable<Topic[]> {
    let topicByUser: AngularFirestoreCollection<Topic>;
    topicByUser = this.afs.collection(this.COLLECTION_NAME, ref =>
      ref.where('user_id', '==', userId)
    );

    return topicByUser.valueChanges({ idField: 'id' });
  }
}
