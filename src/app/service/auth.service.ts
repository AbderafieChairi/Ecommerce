import { Injectable } from '@angular/core';
import {Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth'
import {signInWithPopup,GoogleAuthProvider} from '@angular/fire/auth'
import { FirestoreModule } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : Auth,private db:FirestoreModule) { }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  normalSignIn(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password)

    .catch(e=>{
      if (e.code=="auth/user-not-found"){
        console.log("create new user")
        createUserWithEmailAndPassword(this.auth,email,password)
      }
    })
  }

  // createUser(id:String){
  //   addDoc(collection(db))
  // }
  googleSignIn(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth,provider)

  }
  signUp(datail :any[]){

  }
}
