import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ){    
  }

  login(login, psw){
    return this.fireAuth.signInWithEmailAndPassword(login, psw);
  }

  register(login, psw){
    return this.fireAuth.createUserWithEmailAndPassword(login, psw);
  }

  recoverPsw(email) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  async getCurrentUser(){
    return this.fireAuth.authState.pipe(first()).toPromise();
  }
  
  createProfile(userName, email, uid) {
    return this.firestore.collection('Users')
    .doc(uid).set({
      createdAt: Date.now(),
      uid: uid,
      bloq: false,
      admin: false,
      email: email,
      name: userName,
      photoURL: 'Sem foto...',
      address: 'Adicione seu endereço!',
      obs: 'Ótimo, agora ficou mais fácil participar dos editais!',
      updatedAt: Date.now(),
    });
  }

  getUserData(){
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          isAnonymous: user.isAnonymous,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken
        }
        localStorage.setItem('userData', this.user);
      }
      else {
        console.log('No User: ', user);
      }
    });
  }

  // Get Profile
  getUserProfile(id: string) {
    let userRef = this.firestore.doc('Users/' + id);
    return userRef.snapshotChanges();
  }

  async logout() {
    return await this.fireAuth.signOut().then(() => {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userData');
      localStorage.removeItem('userUID');
    });
  }
  
}
