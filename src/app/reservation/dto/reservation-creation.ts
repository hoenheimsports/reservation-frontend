import {IPayment} from "../models/payment.model";
import {ReservationState} from "../models/reservation-state";
import {PaymentCreation} from "./payment-creation";

export interface ReservationCreation {
  name:string,
  email:string,
  tel:string,
  payment:PaymentCreation,
  comments:string | undefined,
  nbrAdult:number,
  nbrTeen:number,
  nbrKid:number,
  nbrMeal:number,
}
