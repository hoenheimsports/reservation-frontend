import {Component, OnInit} from '@angular/core';
import {catchError, map, of, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-reservation-validate',
  templateUrl: './admin-reservation-validate.component.html',
  styleUrls: ['./admin-reservation-validate.component.scss']
})
export class AdminReservationValidateComponent implements OnInit{

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
      })).subscribe(
      reservationId => {
        this.reservationService.validateReservation(reservationId).pipe(
          tap((reservation => this.snackBar.open("reussi : " + reservation.id, "fermer"))),
          catchError( () => {
            this.snackBar.open("erreur","fermer");
            return of({})
          })
        ).subscribe();
      }
    );
  }


}
