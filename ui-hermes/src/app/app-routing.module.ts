import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuiNavComponent } from './mui-nav/mui-nav.component';
import { MuiApiTableComponent } from './mui-api-table/mui-api-table.component';
import { FooterComponent } from './footer/footer.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {path:'info', component: MuiApiTableComponent},
  {path:'', component: FooterComponent},
  {path:'user/register', component: UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
