import { Injectable } from '@angular/core';
import {IReservation} from "../models/reservation.model";
import {ReservationCreation} from "../dto/reservation-creation";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth/service/auth.service";
import {StatisticReservation} from "../models/statistic-reservation";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private authService:AuthService,private snackBar:MatSnackBar,private http:HttpClient) {}

  public createReservation(reservation:ReservationCreation ):Observable<string> {
    type IdJson = { id:string};
    return  this.http.post<IdJson>(environment.api+'/reservation',reservation).pipe(
      map( json => json.id)
    );
  }

  public getAllReservation():Observable<IReservation[]> {
    return this.http.get<IReservation[]>(environment.api+'/reservation',this.authService.getHeaders()).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des réservations :', error);
        this.snackBar.open('Erreur inconnue sur le serveur', 'Fermer');
        return of([]);
      })
    )
  }

  public getReservationById(id:string):Observable<IReservation | null> {
     return this.http.get<IReservation>(environment.api+'/reservation/'+id).pipe(
       catchError(error => {
         if(error.status === 404) {
           throw new Error(error);

         } else {
           console.error('Erreur lors de la récupération de la réservation :', error);
           this.snackBar.open('Erreur inconnue sur le serveur','Fermer')
         }
         return of(null);
       })
     );
  }

  public calculateInvoiceAmount(reservation:IReservation):number {
    const priceKid:number = environment.priceKid;
    const priceTeen:number = environment.priceTeen;
    const priceAdult:number = environment.priceAdult;
    const priceMeal:number = environment.priceMeal;

    return reservation.nbrKid * priceKid
      + reservation.nbrTeen * priceTeen
      + reservation.nbrAdult * priceAdult
      + reservation.nbrMeal * priceMeal;
  }


  collectPayment(idReservation:string,name:string,typePayment:string):Observable<IReservation | null> {
    return this.http.put<IReservation>(environment.api+"/reservation/"+idReservation+"/collect", {name:name,typePayment:typePayment},this.authService.getHeaders());
  }

  refundPayment(idReservation:string,name:string,typePayment:string):Observable<IReservation | null> {
    return this.http.put<IReservation>(environment.api+"/reservation/"+idReservation+"/refund", {name:name,typePayment:typePayment},this.authService.getHeaders());

  }

  cancelReservation(idReservation:string):Observable<IReservation | null> {
    return this.http.get<IReservation>(environment.api+"/reservation/"+idReservation+"/cancel",this.authService.getHeaders());
  }

  validateReservation(idReservation: string): Observable<IReservation | null> {
    return this.http.get<IReservation>(environment.api+"/reservation/"+idReservation+"/validate",this.authService.getHeaders());
  }

  resendValidationEmail(idReservation:string):Observable<boolean> {
      return this.http.get<void>(environment.api+"/reservation/"+idReservation+"/resend",this.authService.getHeaders())
        .pipe(
          map(() => true),
          catchError(() => of(false))
        );
  }

  statisticReservation():Observable<StatisticReservation> {
    return this.http.get<StatisticReservation>(environment.api+"/reservation/stat",this.authService.getHeaders());
  }
}
