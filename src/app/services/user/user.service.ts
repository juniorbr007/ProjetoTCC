import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  total: any;
  user: User;

  constructor(
    private firestore: AngularFirestore
  ){
  }

  getTotalUsers(){
    return this.total;
  }

  setTotalUsers(total){
    this.total = total;
  }

  getUserById(userId){
    return this.firestore.collection<User>('Users').doc(userId).ref.get();
  }

  listUsers(){
    let superQuery = this.firestore.collection('Users').valueChanges();
    return superQuery;
  }
}