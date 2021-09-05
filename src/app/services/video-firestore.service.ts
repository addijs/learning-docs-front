import { Injectable } from '@angular/core';
import { CrudFirestore } from '@shared/crud_abstract_firestore';
import { Video } from '@shared/entities/video';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoFirestoreService extends CrudFirestore<Video> {
  constructor(
      protected db: AngularFirestore
  ) {
    super('videos', db);
  }

  getVideosByTopicId(topicId: number): Observable<Video[]> {
    return this.db.collection<Video>(this.collectionName, ref => {
      return ref.where('topicId', '==', topicId);
    }).valueChanges({ idField: 'id' });
  }
}
