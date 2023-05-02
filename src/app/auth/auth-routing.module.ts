import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationFormComponent} from "../reservation/components/reservation-form/reservation-form.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
