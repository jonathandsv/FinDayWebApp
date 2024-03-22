import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { Totalizers } from './interfaces/totalizers.interface';
import { ExpensesService } from './services/expenses.service';
import { Expense } from './interfaces/expense.interface';
import { ExpenseTypeEnum } from './enums/expense-type.enum';
import { ColumnTable } from '../../shared/components/table/container/table/table.component';
import { Debt } from './interfaces/debt.interface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  totalizers$: Observable<Totalizers>;
  expesesEssential$: Observable<Expense[]>;
  expesesNonEssential$: Observable<Expense[]>;
  expesesDebts$: Observable<Debt[]>;

  columnsDebt: ColumnTable[] = [];

  constructor(private expensesService: ExpensesService) {
    this.totalizers$ = this.getTotalizers();
    this.expesesEssential$ = this.getExpensesByType(ExpenseTypeEnum.Essential);
    this.expesesNonEssential$ = this.getExpensesByType(ExpenseTypeEnum.NonEssential);
    this.expesesDebts$ = this.getDebt();
  }
  
  ngOnInit(): void {
    this.buildColumnsTable(); 
  }

  getDebt(): Observable<Debt[]> {
    return this.expensesService
      .getDebts()
      .pipe(switchMap((resp) => of(resp.data as Debt[])));
  }

  getTotalizers(): Observable<Totalizers> {
    return this.expensesService
      .getTotalizers()
      .pipe(switchMap((resp) => of(resp.data as Totalizers)));
  }

  getExpensesByType(type: ExpenseTypeEnum): Observable<Expense[]> {
    return this.expensesService
      .getByType(type)
      .pipe(switchMap((resp) => of(resp.data as Expense[])));
  }

  buildColumnsTable() {
    this.columnsDebt = [
      { id: 1, field: 'description', order: '', header: 'Descrição', width: 50},
      { id: 2, field: 'value', order: '', header: 'Valor', width: 10},
      { id: 3, field: 'timesInstallment', order: '', header: 'Quantidade de Parcelas', width: 10},
      { id: 4, field: 'value', order: '', header: 'Valor da Parcela', width: 10},
      { id: 5, field: 'value', order: '', header: 'Valor Restante', width: 10},
      { id: 6, field: 'value', order: '', header: 'Valor Total', width: 10}
    ]
  }
}