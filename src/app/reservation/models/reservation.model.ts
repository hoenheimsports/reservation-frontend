import {IPayment} from "./payment.model";
import {ReservationState} from "./reservation-state";

export interface IReservation {
  id:string ,
  name:string,
  email:string,
  tel:string,
  payment:IPayment ,
  state:ReservationState ,
  comments:string,
  nbrAdult:number,
  nbrTeen:number,
  nbrKid:number,
  nbrMeal:number,
  createDate:Date,
  qrCodeBase64:string,
  cancelMessage:string,
}
