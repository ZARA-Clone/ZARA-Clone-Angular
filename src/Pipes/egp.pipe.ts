import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egp',
  standalone: true
})
export class EgpPipe implements PipeTransform {

   transform(value: number): string {
    const formattedValue = new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(value);
    return formattedValue.replace('EGP', '').trim() + ' EGP';
  }

}
