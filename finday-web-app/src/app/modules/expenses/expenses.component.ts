import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { Totalizers } from './interfaces/totalizers.interface';
import { ExpensesService } from './services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  totalizers$: Observable<Totalizers>;

  constructor(private expensesService: ExpensesService) {
    this.totalizers$ = this.getTotalizers();
  }
  
  ngOnInit(): void {
    
  }

  getTotalizers(): Observable<Totalizers> {
    return this.expensesService
      .getTotalizers()
      .pipe(switchMap((resp) => of(resp.data as Totalizers)));
  }
}