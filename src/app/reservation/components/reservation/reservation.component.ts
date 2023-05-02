import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, filter, map, Observable, of, startWith, switchMap} from "rxjs";
import {ReservationService} from "../../services/reservation.service";
import {IReservation} from "../../models/reservation.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservationIdCtrl!: FormControl;
  reservation$!: Observable<IReservation | null>;

  initialValueReservationIdCtrl!: string;

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private route: ActivatedRoute, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.pipe(
      map(params => {
        if (params.hasOwnProperty('id')) {
          return params['id'];
        } else {
          return "";
        }
      })).subscribe(
      reservationId => {
        this.reservationIdCtrl.setValue(reservationId);
        this.initialValueReservationIdCtrl = reservationId;
      }
    );
    this.initObservable();

  }

  private initForm(): void {
    this.reservationIdCtrl = this.formBuilder.control('', {
      validators: [Validators.pattern(/^[A-Z0-9]{9}$/)],
      updateOn: 'change'
    });
  }

  private initObservable(): void {
    this.reservation$ = this.reservationIdCtrl.valueChanges.pipe(
      startWith(this.initialValueReservationIdCtrl),
      filter(reservationId => reservationId !== null && reservationId.length !== 0),
      switchMap(reservationId => {
        if (this.reservationIdCtrl.invalid) {
          return of(null);
        } else {
          return this.reservationService.getReservationById(reservationId).pipe(
            catchError(() => {
              this.snackBar.open('Votre reservation n\'a pas été trouvée, verifiez le code.', 'Fermer', {
                duration: 10000
              });
              return of(null);
            })
          );
        }
      })
    );
  }

}
