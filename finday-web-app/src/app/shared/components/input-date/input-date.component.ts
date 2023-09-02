import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
})
export class InputDateComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() field: string;
  @Input() ariaLabelledBy: string;
  @Input() disabled: boolean;
  @Output() item = new EventEmitter();
  @Input() focusOut: boolean = false;
  @Input() maxDate = new Date('99/99/9999');
  @Input() minDate = null;
  @Output() limpar = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  selecionar(event: any) {
    this.item.emit(event);
  }
  changeOut(event: any){
    this.item.emit(event);
  }
  limparCampo(field: string) {
    this.limpar.emit(this.formGroup.get([field]).value);
  }

  setDateValue(obj: any, field: string) {
    if (obj.inputType === "deleteContentBackward") {
      return;
    }
    const value = obj.target.value;
    if (value.length === 2) {
      obj.target.value = `${value}/`;
    } else if (value.length === 5) {
      obj.target.value = `${value}/`;
    } else if (value.length >= 10) {
      const date = value.substring(0, 10).split('/');
      const dateObj = new Date(date[2], date[1] - 1, date[0]);
      this.formGroup.get([field]).setValue(dateObj);
  
      if (this.focusOut) {
        this.item.emit(dateObj);
      }
    }
    if (new Date(this.formGroup.get([field]).value) > this.maxDate) {
      this.formGroup.get([field]).setValue('');
      this.item.emit(this.formGroup.get([field]).value);
    }
  }
}
