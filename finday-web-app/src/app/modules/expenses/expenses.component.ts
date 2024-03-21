import { Component, OnInit } from '@angular/core';
import { ExpensesService } from './services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  constructor(private expensesService: ExpensesService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
