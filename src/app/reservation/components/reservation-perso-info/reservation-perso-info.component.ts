import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IReservation} from "../../models/reservation.model";

@Component({
  selector: 'app-reservation-perso-info',
  templateUrl: './reservation-perso-info.component.html',
  styleUrls: ['./reservation-perso-info.component.scss']
})
export class ReservationPersoInfoComponent implements OnInit{
  @Input() reservation$!:Observable<IReservation | null>;

  ngOnInit(): void {
  }
}
