import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, delay, interval, map, Observable, of, tap} from "rxjs";
import {IReservation} from "../../models/reservation.model";
import {ReservationService} from "../../services/reservation.service";
import {PaymentCreation} from "../../dto/payment-creation";
import {ReservationCreation} from "../../dto/reservation-creation";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../environments/environment";



@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {

  environment!:any;

  loading!: boolean;
  isSubmit!: boolean;

  showChequePayment$!: Observable<boolean>;
  showCBPayment$!: Observable<boolean>;
  showDirectPayment$!: Observable<boolean>;

  formDirectPaymentAcceptationCtrl!: FormControl;
  formChequePaymentAcceptationCtrl!: FormControl;
  formNbrReservation!: FormGroup;
  formInfoReservation!: FormGroup;
  formReservation!: FormGroup;
  formPaymentPreferenceCtrl!: FormControl;
  formPayment!: FormGroup;
  reservationPreview$!: Observable<IReservation>;
  amount$!: Observable<number>;


  constructor(private snackBar:MatSnackBar,private router: Router, private formBuilder: FormBuilder, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.environment = environment;
    this.loading = false;
    this.isSubmit = false;
    //Controle sur le type de payment et l'engagement à payer.
    this.initFormCtrl();
    //Formulaire de reservation
    this.initFormReservation();
    //TODO : formulaire de payement
    this.initFormCBPayment();
    // Construction du formulaire final
    this.initForm();

    this.initObservable();
  }


  onSubmitForm(): void {
    this.isSubmit = true;
    if (this.formReservation.invalid) {
      const errors = this.getFormErrors(this.formReservation);
      this.snackBar.open('Le formulaire n\'est pas valide (en rouge)','Fermer', {
        duration:5000,
      })
    } else {
      // Traitez ici les données du formulaire, par exemple en les envoyant à un serveur
      this.loading = true;
      this.reservationService.createReservation(this.toReservationCreation(this.formReservation))
        .pipe(
          catchError(() => {
            this.snackBar.open('Une erreur inconnu est survenue','Fermer');
            return of("ERROR");
          }),
          delay(3000),
          tap(() => this.loading = false),
          tap(reservationId => this.router.navigateByUrl('/reservation/ma-reservation/' + reservationId))
        )
        .subscribe();
    }
  }

  private initFormCtrl(): void {
    this.formDirectPaymentAcceptationCtrl = this.formBuilder.control('', Validators.requiredTrue);
    this.formChequePaymentAcceptationCtrl = this.formBuilder.control('', Validators.requiredTrue);
    this.formPaymentPreferenceCtrl = this.formBuilder.control('', Validators.required);

  }

  private initFormReservation(): void {
    const telRegex: RegExp = /^(?:(?:0\d{9})|(?:[1-9]\d{7})|(?:0\d(?:\s\d{2}){4})|(?:[1-9](?:\s?\d{2}){4}))$/;

    this.formNbrReservation = this.formBuilder.group({
      nbrKid: [null],
      nbrTeen: [null],
      nbrAdult: [null],
      nbrMeal: [null],
    }, {updateOn: "change"});

    this.formInfoReservation = this.formBuilder.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        tel: [null, [Validators.required, Validators.pattern(telRegex)]],
        nbrReservation: this.formNbrReservation,
        comments: [null],
      },
      {updateOn: "blur"});
  }

  private initFormCBPayment(): void {
    this.formPayment = this.formBuilder.group({
      payment: [null],
    })
  }

  private initForm(): void {
    this.formReservation = this.formBuilder.group({
      reservation: this.formInfoReservation,
      paymentPreference: this.formPaymentPreferenceCtrl,
      payment: this.formPayment,
      chequePaymentAcceptation: this.formChequePaymentAcceptationCtrl,
      directPaymentAcceptation: this.formDirectPaymentAcceptationCtrl,
    })
  }


  private initObservable(): void {
    this.reservationPreview$ = this.formInfoReservation.valueChanges.pipe(
      map(formReservation => this.formInfoReservationToIReservation(formReservation))
    );
    this.amount$ = this.formInfoReservation.valueChanges.pipe(
      map(formReservation => this.formInfoReservationToIReservation(formReservation)),
      map(r => r as IReservation),
      map(r => this.reservationService.calculateInvoiceAmount(r)),
    );
    this.showChequePayment$ = this.formPaymentPreferenceCtrl.valueChanges.pipe(
      map(payment => payment === 'cheque'),
      // Met à jour les validateurs pour l'engagement de payer
      tap(chequePaymentControl => {
        if (chequePaymentControl) {
          this.formChequePaymentAcceptationCtrl.addValidators([
            Validators.requiredTrue
          ]);
        } else {
          this.formChequePaymentAcceptationCtrl.clearValidators();
        }
        this.formChequePaymentAcceptationCtrl.updateValueAndValidity();
      })
    );
    this.showCBPayment$ = this.formPaymentPreferenceCtrl.valueChanges.pipe(
      map(payment => payment === 'cb'),
      // Met à jour les validateurs pour l'engagement de payer
      tap(cbPaymentControl => {
        if (cbPaymentControl) {
          // TODO
        } else {
          // TODO
        }
        // TODO
      })
    );
    this.showDirectPayment$ = this.formPaymentPreferenceCtrl.valueChanges.pipe(
      map(payment => payment === 'direct'),
      // Met à jour les validateurs pour l'engagement de payer
      tap(directPaymentControl => {
        if (directPaymentControl) {
          this.formDirectPaymentAcceptationCtrl.addValidators([
            Validators.requiredTrue
          ]);
        } else {
          this.formDirectPaymentAcceptationCtrl.clearValidators();
        }
        this.formDirectPaymentAcceptationCtrl.updateValueAndValidity();
      })
    );
  }

  getFormControlErrorText(ctrl: AbstractControl | null): string {
    if (ctrl === null) {
      return "";
    }
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Cette email est invalide';
    } else if (ctrl.hasError('pattern')) {
      return 'Ce numéro de téléphone est invalide';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  toReservationCreation(formReservation: any): ReservationCreation {
    const paymentCreationDTO: PaymentCreation = {
      type: formReservation.get('paymentPreference').value
    };
    const reservationForm = formReservation.get('reservation').value;
    return {
      name: reservationForm['name'],
      tel: reservationForm['tel'],
      email: reservationForm['email'],
      comments: reservationForm['comments'] || undefined,
      payment: paymentCreationDTO,
      nbrAdult: reservationForm['nbrReservation']['nbrAdult'] || 0,
      nbrTeen: reservationForm['nbrReservation']['nbrTeen'] || 0,
      nbrKid: reservationForm['nbrReservation']['nbrKid'] || 0,
      nbrMeal: reservationForm['nbrReservation']['nbrMeal'] || 0,
    };
  }

  private formInfoReservationToIReservation(formReservation: any): IReservation {
    return {
      name: formReservation.name,
      tel: formReservation.tel,
      email: formReservation.email,
      comments: formReservation.comments,
      nbrAdult: formReservation.nbrReservation.nbrAdult,
      nbrTeen: formReservation.nbrReservation.nbrTeen,
      nbrKid: formReservation.nbrReservation.nbrKid,
      nbrMeal: formReservation.nbrReservation.nbrMeal
    } as IReservation;
  }

  private getFormErrors(formGroup: FormGroup): { [key: string]: any } {
    let errors: { [key: string]: any } = {};

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        errors[key] = this.getFormErrors(control);
      } else {
        const controlErrors = control?.errors;
        if (controlErrors) {
          errors[key] = controlErrors;
        }
      }
    });

    return errors;
  }


}
