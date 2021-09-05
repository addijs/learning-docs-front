import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from "../../firestore.config";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class FirestoreModule { }
