import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1,2})(\d{2})(\d{2})(\d{2})(\d{2})$/);

    if (match) {
      const firstPart = match[1].length === 1 ? '0' + match[1] : match[1];
      return `${firstPart} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }

    return value;
  }

}
