import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth'
import {signInWithPopup,GoogleAuthProvider} from '@angular/fire/auth'
import { FirestoreModule } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth : Auth,private db:FirestoreModule,private router:Router) { 
    this.auth.onAuthStateChanged(u=>{
      if(!u){
        localStorage.removeItem("user");
      }
    })

  }

  getCurrentUser(){
    return this.userStorage;
  }


  get userStorage():User{
    const user_st = localStorage.getItem("user");
    return user_st!=null ? JSON.parse(user_st) as User:{} as User;
  }
  set userStorage(user:User){
    localStorage.setItem("user",JSON.stringify(user));
  }

  async normalSignIn(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
    .then((user)=>{
      console.log('http://localhost:8080/user/'+user.user.uid)
      fetch('http://localhost:8080/user/'+user.user.uid)
      .then(res=>res.json())
      .then((json:User)=>{
        console.log("get user from local server")
        this.userStorage=json
        if(json?.rule=="admin") this.router.navigate(['admin','dashboard'])
        else this.router.navigate(['store','profile'])
      })
    })
    .catch(e=>{
      if (e.code=="auth/user-not-found"){
        console.log("user not found")
        createUserWithEmailAndPassword(this.auth,email,password);
        this.router.navigate(['user',"signup"])
      }
    })
  }
  async createUser(user:any){
    const u =user;
    u.email = this.auth.currentUser?.email;
    u.id = this.auth.currentUser?.uid;
    console.log("create new user")
    return fetch('http://localhost:8080/user',{
      method:'POST',
      body:JSON.stringify(u),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    })
    .then(res=>res.json())
    .then(json=>{
      this.userStorage=json;
      this.router.navigate(['store','profile'])
    })
    .catch(err=>console.log("an error occured when user creation"))
  }
  googleSignIn(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth,provider)
    .then((user)=>{
      console.log("get user from server side")

      fetch('http://localhost:8080/user/'+user.user.uid.toString())
      .then(res=>res.json())
      .then(json=>{
        this.userStorage=json;
        if(json?.rule=="admin") this.router.navigate(['admin','dashboard'])
        else this.router.navigate(['store','profile'])
      })
      .catch(err=>{
        console.log(err)
        this.router.navigate(['user','signup'])
      })
    })

  }
  logout(){
    this.auth.signOut()
    .then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['store','home'])
    })
  }
}
