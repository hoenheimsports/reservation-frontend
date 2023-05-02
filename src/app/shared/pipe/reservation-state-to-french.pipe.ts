import { Pipe, PipeTransform } from '@angular/core';
import {ReservationState} from "../../reservation/models/reservation-state";

@Pipe({
  name: 'reservationStateToFrench'
})
export class ReservationStateToFrenchPipe implements PipeTransform {

  transform(value: ReservationState,icon: 'icon'|'text' = 'text'): string {
  const isIcon:boolean = icon === 'icon';
    switch (value) {
      case ReservationState.CANCELED:
        return isIcon ? 'cancel' : 'Annulé :';
      case ReservationState.ACCEPTED:
        return isIcon ? 'task_alt' : 'Accepté';
      case ReservationState.PENDING:
        return isIcon ? 'pending' : 'En attente';
      case ReservationState.ONGOING:
        return isIcon ? 'nightlife' : 'En cours';
      default:
        return '';
    }
  }
}
