import { Injectable } from '@angular/core';
import { CrudFirestore } from '@shared/crud_abstract_firestore';
import { Topic } from '@shared/entities/topic';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicFirestoreService extends CrudFirestore<Topic> {
  private readonly selectedTopicIdSubject = new BehaviorSubject<number>(null);
  readonly selectedTopicId$ = this.selectedTopicIdSubject.asObservable();

  constructor(
      public db: AngularFirestore
  ) {
    super('topics', db);
  }

  handleSelectedTopic(topicId: number): void {
    this.selectedTopicIdSubject.next(topicId);
  }

  getTopicsByUserId(userId: number): Observable<Topic[]> {
    return this.db.collection<Topic>(this.collectionName, ref => {
      return ref.where('userId', '==', userId);
    }).valueChanges({ idField: 'id' });
  }
}
