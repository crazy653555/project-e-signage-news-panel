import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekComponent } from './weather/week/week.component';

const routes: Routes = [
  {path:'',redirectTo:'weather/week',pathMatch:'full'},
  {path:'weather/week',component:WeekComponent},
  {path:'**',redirectTo:'weather/week',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
