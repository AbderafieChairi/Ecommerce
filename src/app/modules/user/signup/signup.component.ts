import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public detailForm!: FormGroup;
  public toDetail = false;
  constructor(
    private authService : AuthService
  ){}
  ngOnInit() {

    this.detailForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      'sexe': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    const currentUser = this.authService.getCurrentUser();
    const j={
      id:currentUser?.uid?.toString(),
      email:currentUser?.email?.toString(),
      name:this.detailForm.value['name'],
      birthday:this.detailForm.value['birthday'],
      phone:this.detailForm.value['phone'],
      address:this.detailForm.value['address'],
      sexe:this.detailForm.value['sexe'],
      active:false,
    }
    console.log(j);
    fetch('http://10.72.128.43:8080/client',{
      method:'Post',
      body:JSON.stringify(j),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    })
    .then(res=>res.json())
    .then(json=>console.log(json))
    .catch(err=>console.log(err))
  }
}
