import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IReservation} from "../../models/reservation.model";

@Component({
  selector: 'app-reservation-payment-info',
  templateUrl: './reservation-payment-info.component.html',
  styleUrls: ['./reservation-payment-info.component.scss']
})
export class ReservationPaymentInfoComponent implements OnInit{
  @Input() reservation$!:Observable<IReservation | null>;

  ngOnInit(): void {
  }
}
