import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from "../models/user.model"
import {Note} from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore, ) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getNotebook(userId: User, notebookId: string) {
    return this.firestore.collection(`users/${userId}/notebook/${notebookId}`).snapshotChanges();
  }

  getNotes(userId: User) {
    return this.firestore.collection(`users/${userId}/notebook`).snapshotChanges();
  }

  createNote(userId: User){
    return this.firestore.collection(`users/${userId}/notebook/`).add({
      title: "Untitled",
      note: ""
    });
  }

  deleteNote(userId: User, noteId: string) {
    return this.firestore.collection(`users/${userId}/notebook`).doc(noteId).delete();
  }

  updateNote(userId: User, noteId: string, title: string, noteText: string) {
    return this.firestore.collection(`users/${userId}/notebook`).doc(noteId).update({title: title, note: noteText})
  }
}
