import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'reservation', loadChildren:() => import('./reservation/reservation.module').then(m => m.ReservationModule)},
  { path: 'login', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'info', loadChildren:() => import('./info/info.module').then(m => m.InfoModule)},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
