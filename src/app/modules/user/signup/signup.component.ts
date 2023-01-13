import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
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
    this.authService.createUser(this.detailForm.value)
  }

}
