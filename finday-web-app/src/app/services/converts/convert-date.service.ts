import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConvertDateService {

  constructor() { }

  convertNgbDateStructToDate(value: NgbDateStruct): Date {
    const date = new Date(value.year, value.month - 1, value.day);
    return date;
  }
  convertDateToNgbDateStruct(value: string): NgbDateStruct {
    const datejs = new Date(value);
    const date: NgbDateStruct = { 
      year: datejs.getFullYear(), 
      month: datejs.getMonth() + 1, 
      day: datejs.getDate() 
    };
    return date;
  }
}
