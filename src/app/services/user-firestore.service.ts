import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from '@shared/entities/user';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserFirestoreService {
  userCollection: AngularFirestoreCollection<User>;
  COLLECTION_NAME = 'users';

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection(this.COLLECTION_NAME);
  }

  signup(user: User): Observable<DocumentReference<User>> {
    delete user.id;

    return from(this.userCollection.add(Object.assign({}, user)));
  }

  getUser(email: string): Observable<User[]> {
    return this.afs
      .collection<User>('users', ref => ref.where('email', '==', email))
      .valueChanges({ idField: 'id' });
  }
}
