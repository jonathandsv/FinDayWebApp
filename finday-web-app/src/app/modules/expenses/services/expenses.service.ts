import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiOutput } from '../../../interfaces/api-output.interface';
import { launch } from '../../launch/interfaces/launch.interface';
import { ExpenseTypeEnum, ForecastEnum } from '../enums/expense-type.enum';
import { Debt } from '../interfaces/debt.interface';
import { Expense } from '../interfaces/expense.interface';
import { Totalizers } from '../interfaces/totalizers.interface';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService {
    url = `${environment.API}/expense`;

    constructor(protected http: HttpClient, protected router: Router) {}

    getByType(expenseTypeEnum: ExpenseTypeEnum): Observable<ApiOutput<Expense[]>> {
        let params = new HttpParams();
        params = params.set('expenseTypeEnum', expenseTypeEnum ? expenseTypeEnum : 1);
        return this.http.get<ApiOutput<Expense[]>>(`${this.url}/by-type`, { params }).pipe(take(1));
    }

    getByForecast(forecastEnum: ForecastEnum): Observable<ApiOutput<launch[]>> {
        let params = new HttpParams();
        params = params.set('forecastEnum', forecastEnum ? forecastEnum : 1);
        return this.http.get<ApiOutput<launch[]>>(`${this.url}/by-forecast`, { params }).pipe(take(1));
    }
    
    getDebts(): Observable<ApiOutput<Debt[]>> {
        return this.http.get<ApiOutput<Debt[]>>(`${this.url}/debts`).pipe(take(1));
    }

    getTotalizers(): Observable<ApiOutput<Totalizers>> {
        return this.http.get<ApiOutput<Totalizers>>(`${this.url}/totalizers`).pipe(take(1));
    }
}