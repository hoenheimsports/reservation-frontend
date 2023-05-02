import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {AuthGuard} from "./core/gard/auth.guard";

const routes: Routes = [{ path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'reservation', loadChildren:() => import('./reservation/reservation.module').then(m => m.ReservationModule)},
  { path: 'login', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
