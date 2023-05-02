import { Pipe, PipeTransform } from '@angular/core';
import {PaymentState} from "../../reservation/models/payment-state";

@Pipe({
  name: 'paymentStateToFrench'
})
export class PaymentStateToFrenchPipe implements PipeTransform {

  transform(value: PaymentState, icon: 'icon'|'text' = 'text'): string {
    const isIcon:boolean = icon === 'icon';
    switch (value) {
      case PaymentState.ACCEPTED:
        return isIcon ? 'paid' : 'Accepté';
      case PaymentState.CANCELED:
        return isIcon ? 'money_off' : 'Annulé';
      case PaymentState.PENDING:
        return isIcon ? 'paid' : 'En attente';
      case PaymentState.REFUNDED:
        return isIcon ? 'currency_exchange' : 'Remboursé';
      default:
        return '';
    }
  }

}
