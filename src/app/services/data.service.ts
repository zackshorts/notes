import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from "../models/user.model"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore, ) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getNotebook(userId: User, notebookId: string) {
    return this.firestore.collection(`users/${userId}/notebooks/${notebookId}`).snapshotChanges();
  }

  getNotebooks(userId: User) {
    return this.firestore.collection(`users/${userId}/notebooks`).snapshotChanges();
  }

  createNotebook(notebookName: string, userId: User){
    return this.firestore.collection(`users/${userId}/notebooks/`).add(notebookName);
  }
}
