import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {ReservationFormComponent} from "./components/reservation-form/reservation-form.component";
import {ReservationComponent} from "./components/reservation/reservation.component";
import {AdminComponent} from "./components/admin/admin.component";
import {AuthGuard} from "../core/gard/auth.guard";
import {
  AdminReservationValidateComponent
} from "./components/admin-reservation-validate/admin-reservation-validate.component";

const routes: Routes = [
  { path: 'reserver', component: ReservationFormComponent },
  { path: 'ma-reservation', component: ReservationComponent },
  { path: 'admin', component: AdminComponent,canActivate:[(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)] },
  { path: 'ma-reservation/:id', component: ReservationComponent },
  { path: ':id/validate', component: AdminReservationValidateComponent,canActivate:[(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)] },

  // Définition des autres routes de ce module si besoin
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
