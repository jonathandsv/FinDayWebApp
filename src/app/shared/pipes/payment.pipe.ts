import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

  transform(value: string,): string {
    switch (value) {
      case 'cartao': return 'credit-card';
      case 'dinheiro': return 'money';
    }
    return 'money';
  }

}
