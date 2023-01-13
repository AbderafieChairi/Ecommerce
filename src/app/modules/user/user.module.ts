import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports:[
    LoginComponent,
    SignupComponent
  ]
})
export class UserModule { }
