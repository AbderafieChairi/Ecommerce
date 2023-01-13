import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { AuthGuardService } from 'src/app/service/auth-guard.service';

const routes: Routes = [
    {path:'',component:IndexComponent,children:[
        {path:'login',component:LoginComponent,canActivate:[AuthGuardService]},
        {path:'signup',component:SignupComponent,canActivate:[AuthGuardService]},
        
    ]}
    
  ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class UserRoutingModule { }
