import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from "../models/user.model"
import {Notebook} from '../models/notebook.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore, ) { }

  getUsers() {
    return this.firestore.collection('users').valueChanges();
  }

  getNotebooks(userId: User) {
    return this.firestore.collection(`users/${userId}/notebooks/`).valueChanges();
  }

  createNotebook(notebook: Notebook, userId: User){
    return this.firestore.collection(`users/${userId}/notebooks/`).add(notebook);
  }
}
