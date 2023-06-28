import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-admin-reservation-validatewithcode',
  templateUrl: './admin-reservation-validatewithcode.component.html',
  styleUrls: ['./admin-reservation-validatewithcode.component.scss']
})
export class AdminReservationValidatewithcodeComponent implements OnInit{
  reservationIdCtrl!: FormControl;
  errorMessage: string | null = null;

  constructor( private formBuilder: FormBuilder,private route: Router,private reservationService : ReservationService) {
  }


  ngOnInit(): void {
    this.reservationIdCtrl = this.formBuilder.control('', {
      validators: [Validators.pattern(/^[A-Z0-9]{6}$/)],
      updateOn: 'change'
    });

    this.reservationIdCtrl.statusChanges.subscribe(status => {
      this.errorMessage = null;
      if (status === 'VALID') {
        let formValue = this.reservationIdCtrl.value as string;
        this.reservationService.getReservationById('SA8' + formValue.toUpperCase())
          .pipe(
            catchError((error => {
              this.errorMessage = 'La réservation n\'a pas été trouvée.';
              return of(null);
            })
          )).subscribe(
            reservation => {
              if(reservation) {
                this.route.navigate(['/reservation',reservation.id,'validate'])
              } else {
                this.errorMessage = 'La réservation n\'a pas été trouvée.';
              }
            }
        );
        console.log('La valeur du contrôle est valide.');
      }
    });
  }

}
