import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public toDetail = false;
  constructor(
      private authService :AuthService,
      private router: Router,
      private route:ActivatedRoute

    
    ){}
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
    
  }

  signIn() {
      this.authService.normalSignIn(this.loginForm.value.email,this.loginForm.value.password)
      .then(()=>{this.router.navigate(["../signup"],{relativeTo: this.route})})
  }
  signInWithGoogle(){
    this.authService.googleSignIn()
    .then(res=>{console.log(res)})
  }
}
