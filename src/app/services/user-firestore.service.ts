import { Injectable } from '@angular/core';
import {from, Observable } from 'rxjs';
import { User } from '@shared/entities/user';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import {CrudFirestore} from "@shared/crud_abstract_firestore";

interface LoginData {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserFirestoreService extends CrudFirestore<User> {
    constructor(
        protected db: AngularFirestore,
    ) {
        super('users', db);
    }

    logIn(credentials: LoginData): Observable<User[]> {
        const { email, password } = credentials;
        return this.db.collection<User>(this.collectionName, ref => {
            return ref.where('email', '==', email)
        }).valueChanges({ idField: 'id' });
    }

    signUp(user: User): Observable<DocumentReference<User>> {
        delete user.id;

        return from(this.inserir(user));
    }
}
