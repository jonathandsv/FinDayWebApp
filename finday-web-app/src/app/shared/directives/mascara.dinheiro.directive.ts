import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[mascaraDinheiro]'
})
export class MascaraDinheiroDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) {
      valor = valor.substr(0, 15);
    }
    valor = (parseInt(valor) / 100).toFixed(2);
    input.value = valor && valor !='NaN' ? valor.replace('.', ',') : '';
  }
}