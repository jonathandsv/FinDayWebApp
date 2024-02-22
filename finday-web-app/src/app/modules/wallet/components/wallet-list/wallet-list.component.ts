import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';

import { Paged } from '../../../../interfaces/paged.interface';
import { ColumnTable } from '../../../../shared/components/table/container/table/table.component';
import { Wallet } from '../../interfaces/wallet.interface';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrl: './wallet-list.component.scss'
})
export class WalletListComponent {
  wallets$: Observable<Wallet[]>;
  public value = 1;
  public totalPages = 10;
  public visibleRangeLength = 5;
  public visiblePages: number[] = [];
  columns: ColumnTable[] = [];

  constructor(private router: Router, 
    private walletsService: WalletService) {

    this.wallets$ = this.walletsService
        .getWalletList()
        .pipe(
          switchMap((resp) => of(resp.data as Paged<Wallet>)),
          tap((resp) => this.totalPages = resp.total),
          // tap((resp) => this.updateVisiblePages()),
          switchMap((resp) => of(resp.records)),
          tap((resp) => console.log(`valor da lista de wallets: `, resp))
  
    );
  }

  ngOnInit(): void {
    this.buildColumnsTable();
  }

  buildColumnsTable() {
    this.columns = [
      { id: 1, field: 'walletTypeFormated', order: '', header: 'Tipo', width: 10},
      { id: 3, field: 'name', order: '', header: 'Nome', width: 85}
    ]
  }

  edit(wallet: Wallet): void  {
    this.router.navigate([`wallet/edit/${wallet.id}`]);
  }
}