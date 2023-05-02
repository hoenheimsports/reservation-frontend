import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IReservation} from "../../models/reservation.model";

@Component({
  selector: 'app-reservation-order-info',
  templateUrl: './reservation-order-info.component.html',
  styleUrls: ['./reservation-order-info.component.scss']
})
export class ReservationOrderInfoComponent implements OnInit{

  @Input() reservation$!:Observable<IReservation | null>;

  ngOnInit(): void {
  }
}
