import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth'
import {signInWithPopup,GoogleAuthProvider} from '@angular/fire/auth'
import { FirestoreModule } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : Auth,private db:FirestoreModule,private router:Router) { }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  async normalSignIn(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
    .then((user)=>{
      fetch('http://localhost:8080/user/'+user.user.uid)
      .then(res=>res.json())
      .then(json=>{
        localStorage.setItem("user",json);
        this.router.navigate(['store','profile'])
      })
    })
    .catch(e=>{
      if (e.code=="auth/user-not-found"){
        console.log("create new user")
        createUserWithEmailAndPassword(this.auth,email,password)
      }
    })
  }
  async createUser(user:any){
    const u =user;
    u.email = this.auth.currentUser?.email;
    u.id = this.auth.currentUser?.uid;
    console.log(u)
    return fetch('http://localhost:8080/user',{
      method:'POST',
      body:JSON.stringify(u),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    })
    .then(res=>res.json())
    .then(json=>{
      localStorage.setItem("user",JSON.stringify(json))
      console.log("user created")
      this.router.navigate(['store','profile'])
    })
    .catch(err=>console.log("an error occured when user creation"))
  }
  // createUser(id:String){
  //   addDoc(collection(db))
  // }
  googleSignIn(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth,provider)
    .then((user)=>{
      console.log(user.user.uid)
      console.log('http://localhost:8080/user/'+user.user.uid.toString())
      fetch('http://localhost:8080/user/'+user.user.uid.toString())
      .then(res=>res.json())
      .then(json=>{
        console.log(json)
        localStorage.setItem("user",JSON.stringify(json));
        this.router.navigate(['store','profile'])
      })
      .catch(err=>{
        console.log(err)
        this.router.navigate(['user','signup'])
      })
    })

  }
  signUp(datail :any[]){

  }
}
