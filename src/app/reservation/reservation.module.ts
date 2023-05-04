import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationPersoInfoComponent } from './components/reservation-perso-info/reservation-perso-info.component';
import { ReservationOrderInfoComponent } from './components/reservation-order-info/reservation-order-info.component';
import { ReservationPaymentInfoComponent } from './components/reservation-payment-info/reservation-payment-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { MealDialogComponent } from './components/info-reservation-dialog/meal-dialog/meal-dialog.component';
import { AdultDialogComponent } from './components/info-reservation-dialog/adult-dialog/adult-dialog.component';
import { TeenDialogComponent } from './components/info-reservation-dialog/teen-dialog/teen-dialog.component';
import { KidDialogComponent } from './components/info-reservation-dialog/kid-dialog/kid-dialog.component';
import { AdminReservationValidateComponent } from './components/admin-reservation-validate/admin-reservation-validate.component';





@NgModule({
  declarations: [
    ReservationFormComponent,
    ReservationComponent,
    ReservationPersoInfoComponent,
    ReservationOrderInfoComponent,
    ReservationPaymentInfoComponent,
    AdminComponent,
    MealDialogComponent,
    AdultDialogComponent,
    TeenDialogComponent,
    KidDialogComponent,
    AdminReservationValidateComponent
  ],
    imports: [
        CommonModule,
        ReservationRoutingModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule
    ],
  exports: [
    ReservationFormComponent
  ]
})
export class ReservationModule { }
