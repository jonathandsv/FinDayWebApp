import { CommonModule } from '@angular/common';
import { Component, Host, Input, SkipSelf } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormGroupDirective, ValidationErrors } from '@angular/forms';

import { ValidationMessages } from './validation-messages.interface';

@Component({
  selector: 'field-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-errors.component.html',
  styleUrl: './field-errors.component.scss'
})
export class FieldErrorsComponent {
  
  messageList: ValidationMessages[] = [
    { required: 'Campo obrigatório.' },
    {
      minlength: (params: any) =>
        `O número mínimo de caracteres é ${params.requiredLength}`,
    },
    {
      maxlength: (params: any) =>
        'O número máximo permitido de caracteres é ' + params.requiredLength,
    },
    { pattern: 'Campo obrigatório' },
    {
      min: (params: any) =>
        `O valor mínimo é ${params.min.toString().replace('.', ',')}`,
    },
    { dateDiff: 'A data fim não pode ser menor que a data início.' },
    { email: 'O E-mail não esta em um formato válido' },
    { notSame: 'As senhas não conferem' },
    { notSameEmail: 'Não condiz com o email informado.' },
    { notValidNumeroDemanda: "Número inválido. (Nº/AAAA)" },
    { notValidSei: "Número SEI inválido." },
    { notValidPeriodo: "Obrigatório preencher uma data de início e fim." }
  ];
  @Input() control:
    | AbstractControlDirective
    | AbstractControl
    | undefined
    | null;
  @Input() nomeLabel: string = '';
  constructor(@Host() @SkipSelf() private form: FormGroupDirective) { }
  ngOnInit(): void { }
  shouldShowErrors(): boolean {
    if (
      this.control &&
      this.control?.errors &&
      (this.control?.dirty || this.control?.touched || this.form.submitted)
    )
      return true;
    else return false;
  }
  listOfErrors(): string[] {
    return Object.keys(
      (this.control as AbstractControlDirective | AbstractControl)
        ?.errors as ValidationErrors
    ).map((field) =>
      this.getMessage(field, (this.control?.errors as ValidationErrors)[field])
    );
  }
  private getMessage(type: string, params: any): string {
    const message = this.messageList.find((x) => x[type]);
    if (message === undefined) return '';
    const messageValue: string =
      message?.[type] instanceof Function
        ? (message?.[type] as Function)(params)
        : (message?.[type] as string);

    const messageFormatado = messageValue.replace('${nome}', this.nomeLabel);
    return messageFormatado;
  }
  addCustomMessages(): void { }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c?.parent?.controls;
    if (!formGroup || typeof formGroup !== 'object') {
      return null;
    }
    if (Array.isArray(formGroup)) {
      const controlIndex = formGroup.findIndex((control) => c === control);
      return controlIndex !== -1 ? controlIndex.toString() : null;
    }
  
    const controlName = Object.keys(formGroup!).find((name) => c === formGroup[name]) || null;

    return controlName || null;
  }
}
