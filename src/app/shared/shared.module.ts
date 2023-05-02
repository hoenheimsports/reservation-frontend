import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialsModule} from "./materials/materials.module";
import { EuroPipe } from './pipe/euro.pipe';
import { ReservationStateToFrenchPipe } from './pipe/reservation-state-to-french.pipe';
import { PaymentStateToFrenchPipe } from './pipe/payment-state-to-french.pipe';
import { PaymentTypeToFrenchPipe } from './pipe/payment-type-to-french.pipe';
import { PhoneNumberPipe } from './pipe/phone-number.pipe';
import { ReservationStateBgColorDirective } from './directive/reservation-state-bg-color.directive';
import { PaymentStateBgColorDirective } from './directive/payment-state-bg-color.directive';
import {AuthService} from "../auth/service/auth.service";



@NgModule({
  declarations: [
    EuroPipe,
    ReservationStateToFrenchPipe,
    PaymentStateToFrenchPipe,
    PaymentTypeToFrenchPipe,
    PhoneNumberPipe,
    ReservationStateBgColorDirective,
    PaymentStateBgColorDirective
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    MaterialsModule,
    EuroPipe,
    PaymentStateToFrenchPipe,
    ReservationStateToFrenchPipe,
    PaymentTypeToFrenchPipe,
    PhoneNumberPipe,
    ReservationStateBgColorDirective,
    PaymentStateBgColorDirective
  ]
})
export class SharedModule { }
