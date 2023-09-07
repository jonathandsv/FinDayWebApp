import { Component, Input, OnInit } from '@angular/core';
import { balanceMonth } from '../../interfaces/balance.interface';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() month = 1;
  balances: balanceMonth[] = [];

  constructor(private balanceService: BalanceService) {}
  
  ngOnInit(): void {
    this.balanceService.getBalancesByMonth(this.month).subscribe({
      next: (resp) => {
        if (resp) {
          this.balances = (resp.data as balanceMonth[]);
        }
      },
      error: (error) => {
        console.error('Erro ao buscar saldos');
      }
    })
  }
}