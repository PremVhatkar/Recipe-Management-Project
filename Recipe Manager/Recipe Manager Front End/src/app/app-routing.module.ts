import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(
      m => m.AdminModule
    )
  },

  {
    path: 'master', loadChildren: () => import('./master/master.module').then(
      m => m.MasterModule
    )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
