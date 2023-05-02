import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(value: number | null): string {
    if (value == null) {
      return "0 €";
    } else {
      const formattedValue = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
      return formattedValue;
    }
  }

}
