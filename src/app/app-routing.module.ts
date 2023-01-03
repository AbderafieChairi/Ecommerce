import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'store',
    loadChildren:()=>import ('./modules/public/public.module').then(m=>m.PublicModule)
  },
  {
    path:'admin',
    loadChildren:()=>import ('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
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
