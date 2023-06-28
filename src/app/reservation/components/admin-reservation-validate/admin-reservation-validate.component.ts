import {Component, OnInit} from '@angular/core';
import {catchError, delay, map, Observable, of, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IReservation} from "../../models/reservation.model";
import {ReservationState} from "../../models/reservation-state";
import {PaymentState} from "../../models/payment-state";

@Component({
  selector: 'app-admin-reservation-validate',
  templateUrl: './admin-reservation-validate.component.html',
  styleUrls: ['./admin-reservation-validate.component.scss']
})
export class AdminReservationValidateComponent implements OnInit{

  loading:boolean = true;
  reservation$!:Observable<IReservation | null>;
  idReservation!:string;

constructor(private route:ActivatedRoute,private reservationService:ReservationService,
            private dialog:MatDialog,
            private snackBar:MatSnackBar) {
}

  ngOnInit(): void {


    this.route.params.pipe(
      map(params => {
        if (params.hasOwnProperty('id')) {
          return params['id'];
        } else {
          return "";
        }
      }),
      tap(id => this.idReservation = id)
      ).subscribe(
      reservationId => {
       this.reservation$ = this.reservationService.validateReservation(reservationId).pipe(
          delay(1500),
          tap(() => this.loading = false),
          tap((reservation) => {
            let message;
            if(reservation != null && reservation.state == ReservationState.ONGOING) {
              message = "La réservation a été validée : " + reservation.id;
            } else if (reservation != null && reservation.payment.paymentState != PaymentState.ACCEPTED) {
              message = "Le payement n'a pas été fait."
            } else {
              message ='La réservation n\'a pas été validée, elle n\'est pas dans l\'etat ACCEPTÉ';
            }
            this.snackBar.open(message, "fermer", {
              duration:4000,
            });
          }),
          catchError( () => {
            this.loading = false;
            this.snackBar.open("erreur","fermer");
            return of(null)
          })
        );
      }
    );
  }


}
