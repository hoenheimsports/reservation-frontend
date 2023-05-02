import { Pipe, PipeTransform } from '@angular/core';
import {PaymentType} from "../../reservation/models/payment-type";

@Pipe({
  name: 'paymentTypeToFrench'
})
export class PaymentTypeToFrenchPipe implements PipeTransform {

  transform(value: PaymentType): string {
    switch (value) {
      case PaymentType.CB:
        return 'CB';
      case PaymentType.CHEQUE:
        return 'Chèque';
      case PaymentType.DIRECT:
        return 'Direct';
      default:
        return '';
    }
  }

}
