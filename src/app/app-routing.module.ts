import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminGuardService } from './service/admin-guard.service';

const routes: Routes = [
  {
    path:'store',
    loadChildren:()=>import ('./modules/public/public.module').then(m=>m.PublicModule),
    
  },
  {
    path:'admin',
    loadChildren:()=>import ('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:[AdminGuardService]

  },
  {
    path:'user',
    loadChildren:()=>import ('./modules/user/user.module').then(m=>m.UserModule)
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
