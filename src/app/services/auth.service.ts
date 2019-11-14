import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user)return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        else {
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.snackBar.open('Successfully logged out!', "Dismiss",{
      duration: 2000,
      panelClass: 'center'
    });
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    this.snackBar.open(user.displayName + " has logged in!", "Dismiss",{
      duration: 2000,
      panelClass: 'center'
    });
    return userRef.set(data, {merge: true});
  }
}
