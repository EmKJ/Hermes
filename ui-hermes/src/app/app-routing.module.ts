import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiTableComponent } from './api-table/api-table.component';
import { MuiNavComponent } from './mui-nav/mui-nav.component';
import { MuiApiTableComponent } from './mui-api-table/mui-api-table.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path:'info', component: MuiApiTableComponent},
  {path:'', component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
