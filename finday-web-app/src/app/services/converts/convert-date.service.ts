import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConvertDateService {

  constructor() { }

  convertNgbDateStructToDate(value: NgbDateStruct | string): Date {
    if (typeof value == 'string') {
      // 14-11-2023
      debugger
      const array = value.split('-');
      const date: NgbDateStruct = {
        day: parseInt(array[0]),
        month: parseInt(array[1]),
        year: parseInt(array[2])
      }
      value = date
    }
    const date = new Date(value.year, value.month - 1, value.day);
    return date;
  }
  convertDateToNgbDateStruct(value: string): NgbDateStruct {
    debugger
    const datejs = new Date(value);
    const date: NgbDateStruct = { 
      year: datejs.getFullYear(), 
      month: datejs.getMonth() + 1, 
      day: datejs.getDate() 
    };
    return date;
  }
}
