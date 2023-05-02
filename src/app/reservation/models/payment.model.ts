import {PaymentState} from "./payment-state";
import {PaymentType} from "./payment-type";

export interface IPayment {
  id:string,
  type:PaymentType,
  paymentState:PaymentState,
  amount:number,
  dateTimePayment:Date,
  personWhoReceivedPayment:string,
}


