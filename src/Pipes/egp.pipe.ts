import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egp',
  standalone: true
})
export class EgpPipe implements PipeTransform {

   transform(value: number): string {
    // Assuming the value is in EGP, format it accordingly
    // You might want to use Intl.NumberFormat for better formatting
    const formattedValue = new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(value);

    // Concatenate the currency symbol after the value
    return formattedValue.replace('EGP', '').trim() + ' EGP';
  }

}
