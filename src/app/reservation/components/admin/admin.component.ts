import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {IReservation} from "../../models/reservation.model";
import {catchError, Observable, of} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentState} from "../../models/payment-state";
import {ReservationState} from "../../models/reservation-state";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StatisticReservation} from "../../models/statistic-reservation";
import * as Papa from 'papaparse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  colorPaymentState: 'primary' | 'secondary' | 'warn' = 'primary';

  breakpointColumnsMap = {
    [Breakpoints.XSmall]: ['id', 'payment-amount', 'payment-type', 'payment-state', 'state', 'view'],
    [Breakpoints.Small]: ['id', 'name', 'payment-amount', 'payment-type', 'payment-state', 'state', 'view'],
    [Breakpoints.Medium]: ['id', 'name', 'nbrAdult', 'nbrTeen', 'nbrKid', 'payment-amount', 'payment-type', 'payment-state', 'state', 'view'],
    [Breakpoints.Large]: ['id', 'name', 'email', 'tel', 'nbrAdult', 'nbrTeen', 'nbrKid', 'payment-amount', 'payment-type', 'payment-state', 'state', 'view']
  };

  dataSource!: MatTableDataSource<IReservation>;

  displayedColumns: string[];

  reservation$!: Observable<IReservation | null>;

  statistic$!: Observable<StatisticReservation>;

  loading: boolean = false;
  formReceipt!: FormGroup;
  formRefund!: FormGroup;

  reservationId!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private reservationService: ReservationService) {
    this.displayedColumns = this.breakpointColumnsMap[Breakpoints.Large];
  }

  SmallBreakPoints!: Observable<boolean>;


  ngOnInit(): void {

    this.formReceipt = this.formBuilder.group({
      nameReceipt: [null, [Validators.required]],
      paymentTypeReceipt: ['cb']
    })

    this.formRefund = this.formBuilder.group({
      nameRefund: [null, [Validators.required]],
      paymentTypeRefund: ['cb']
    })

    Object.keys(this.breakpointColumnsMap).forEach(breakpoint => {
      this.breakpointObserver.observe([breakpoint]).subscribe(result => {
        if (result.matches) {
          this.displayedColumns = this.breakpointColumnsMap[breakpoint];
        }
      });
    });

    this.statistic$ = this.reservationService.statisticReservation();

    this.reservationService.getAllReservation().subscribe(
      reservations => {
        this.dataSource = new MatTableDataSource<IReservation>(reservations);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  private upload():void {
    this.reservationService.getAllReservation().subscribe(reservations => this.dataSource.data = reservations);
    this.statistic$ = this.reservationService.statisticReservation();
  }

  onSubmitFormReceipt(): void {
    this.loading = true;
    if (this.formReceipt.valid) {
      this.reservationService.collectPayment(this.reservationId, this.formReceipt.get('nameReceipt')?.value, this.formReceipt.get('paymentTypeReceipt')?.value)
        .subscribe(
          reservation => {
            this.loading = false;
            this.reservation$ = of(reservation);
            this.upload();
            this.snackBar.open('Reservation encaissée, le paiement et la reservation ont changé de status pour être Accepté', 'Fermer', {
              duration: 3000,
            })
          }
        );
    } else {
      this.snackBar.open('Le formulaire n\'est pas valide (en rouge)', 'Fermer', {
        duration: 5000,
      })
    }
  }

  onSubmitFormRefund(): void {
    this.loading = true;
    if (this.formRefund.valid) {
      this.reservationService.refundPayment(this.reservationId, this.formRefund.get('nameRefund')?.value, this.formRefund.get('paymentTypeRefund')?.value)
        .subscribe(
          reservation => {
            this.loading = false;
            this.reservation$ = of(reservation);
            this.upload();
            this.snackBar.open('Reservation remboursée, le paiement est passé à rembourser et la reservation a été annulée', 'Fermer', {
              duration: 3000,
            })
          }
        );
    } else {
      this.snackBar.open('Le formulaire n\'est pas valide (en rouge)', 'Fermer', {
        duration: 5000,
      })
    }
  }

  onCancel(): void {
    this.loading = true;
    this.reservationService.cancelReservation(this.reservationId)
      .subscribe(
        reservation => {
          this.loading = false;
          this.reservation$ = of(reservation);
          this.upload();
          this.snackBar.open('Reservation remboursée, le paiement est passé à rembourser et la reservation a été annulée', 'Fermer', {
            duration: 3000,
          })
        }
      );
  }

  onValidate() {
    this.loading = true;
    this.reservationService.validateReservation(this.reservationId).pipe(
      catchError(() => {
        this.loading = false;
        this.snackBar.open("erreur", "fermer");
        return of(null)
      })
    ).subscribe(
        reservation => {
          this.loading = false;
          this.reservation$ = of(reservation);
          this.upload();
          let message = 'La réservation n\'a pas été validée, elle n\'est pas dans l\'etat ACCEPTÉ.';
          if (reservation != null && reservation.state == ReservationState.ONGOING) {
            message = "La réservation a été validée : " + reservation.id;
          }
          this.snackBar.open(message, "fermer", {
            duration: 4000,
          });
        }
      );
  }


  onResendEmailConfirmation() {
    this.loading = true;
    this.reservationService.resendValidationEmail(this.reservationId).subscribe(
      reponse => {
        this.loading = false;
        let message = "L'email de validation a été renvoyé";
        if(!reponse) {
          message = "Erreur inconnu";
        }
        this.snackBar.open(message, "fermer", {
          duration: 4000,
        });
      }
    )
  }


  displayReservation(reservationId: string): void {
    this.reservationId = reservationId;
    this.reservation$ = this.reservationService.getReservationById(reservationId);
  }

  getPaymentStateColor(state: PaymentState | string): string {
    switch (state) {
      case PaymentState.ACCEPTED:
        return 'primary';
      case PaymentState.CANCELED:
        return 'warn';
      case PaymentState.PENDING:
        return 'warn';
      case PaymentState.REFUNDED:
        return 'primary';
      default:
        return 'primary';
    }
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilter(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';

  }


  getPaymentStateText(state: PaymentState | string): string {
    switch (state) {
      case PaymentState.ACCEPTED:
        return 'Paiment accepté';
      case PaymentState.CANCELED:
        return 'Paiement annulé';
      case PaymentState.PENDING:
        return 'Paiement en attente';
      case PaymentState.REFUNDED:
        return 'Paiement remboursé';
      default:
        return 'Paiement inconnu';
    }
  }

  getReservationStateColor(state: ReservationState | string): string {
    switch (state) {
      case ReservationState.CANCELED:
        return 'warn';
      case ReservationState.ACCEPTED:
        return 'primary';
      case ReservationState.PENDING:
        return 'warn';
      case ReservationState.ONGOING:
        return 'primary';
      default:
        return '';
    }
  }

  getReservationStateText(state: ReservationState | string): string {
    switch (state) {
      case ReservationState.CANCELED:
        return 'Réservation annulée';
      case ReservationState.ACCEPTED:
        return 'Réservation validée';
      case ReservationState.PENDING:
        return 'Réservation en attente';
      case ReservationState.ONGOING:
        return 'Réservation en cours';
      default:
        return '';
    }
  }


  onDownload() {
    const blob = new Blob([this.convertToCsv(this.dataSource.data)], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();
  }



  private convertToCsv(reservations: IReservation[]):string {
    const headers = [
      'id',
      'etat de la réservation',
      'nom',
      'tél',
      'email',
      'places adultes',
      'places adolescents',
      'places enfants',
      'prix total',
      'type de paiement',
      'personne qui a encaissé',
      'date de l\'encaissement',
      'commentaires',
      'date de création de la reservation'
    ]; // Remplacez par les noms de vos colonnes
    const rows = reservations.map(r => [
      r.id,
      r.state,
      r.name,
      r.tel,
      r.email,
      r.nbrAdult,
      r.nbrTeen,
      r.nbrKid,
      r.payment.amount,
      r.payment.type,
      r.payment.personWhoReceivedPayment,
      r.payment.dateTimePayment,
      r.comments,
      r.createDate]);

    const csvData:string = Papa.unparse({
      fields: headers,
      data: rows
    });



    return csvData;
  }
}

