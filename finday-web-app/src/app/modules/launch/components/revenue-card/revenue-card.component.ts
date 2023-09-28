import { Component, OnInit } from '@angular/core';
import { LaunchTypeEnum, launch, launchInput } from '../../interfaces/launch.interface';
import { LaunchService } from '../../services/launch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces/category.interface';
import { ApiOutput } from 'src/app/core/interfaces/api-output.inteface';
import { WalletService } from 'src/app/modules/wallets/services/wallet.service';
import { IWallet } from 'src/app/modules/wallets/interfaces/wallet.interface';

@Component({
  selector: 'app-revenue-card',
  templateUrl: './revenue-card.component.html',
  styleUrls: ['./revenue-card.component.scss']
})
export class RevenueCardComponent implements OnInit {
  launchs: launch[] = [];
  image: string = 'https://lh3.googleusercontent.com/k95IQpeYutx-lYXwgTZw0kXZl9GAkIOc4Yz3Dr06rndWphZ25kSWyF64aTqT3W4cOxz0eB5LfAss5i9WAR-ZPWVaifijsABLqzEYwHY=h500';
  public activeAuction: any[] = [];
  isVisible = false;
  form: FormGroup;
  launchTypeEnumOptions = LaunchTypeEnum;
  listCategories: ICategory[] = [];
  listWallets: IWallet[] = [];

  constructor(private fb: FormBuilder,
    private launchService: LaunchService,
    private walletService: WalletService) {
    
    this.form = this.fb.group({
      description: [null, [Validators.required]],
      value: [null, [Validators.required]],
      category: [null, [Validators.required]],
      wallet: [null, [Validators.required]],
      launchDate: [null, [Validators.required]],
    })

    this.getLaunchsRevenue();
    this.activeAuction = [
      {
        id: 1346771,
        title: 'Salário Cast',
        creator: 'Jonathan',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 43m 52s',
        last_bid: 22.0,
        price: 35330.9,
        instant_price: 22.0,
        date: '12/06/2023'
      },
      {
        id: 1346772,
        title: 'Alelo',
        creator: 'Jonathan',
        image:
          'https://lh3.googleusercontent.com/k95IQpeYutx-lYXwgTZw0kXZl9GAkIOc4Yz3Dr06rndWphZ25kSWyF64aTqT3W4cOxz0eB5LfAss5i9WAR-ZPWVaifijsABLqzEYwHY=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '2h 00m 02s',
        last_bid: 2.8,
        price: 4812.72,
        instant_price: 2.9,
        date: '12/06/2023'
      },
      {
        id: 1346780,
        title: 'Freella',
        creator: 'Jonathan',
        image:
          'https://lh3.googleusercontent.com/iYNxP1eXG3C6ujTY4REQ9rBea19Z46oKtKkaDS1XA-ED5iFhFmPrvQPzwx8ZwACydCS2wbZ7K1P89XIED3s8JRcT6Pn0M1-sMifeyQ=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 1.0,
        price: 1602.77,
        instant_price: 2.9,
        date: '12/06/2023'
      },
      {
        id: 1346792,
        title: 'FinDay',
        creator: 'Jonathan',
        image:
          'https://lh3.googleusercontent.com/ujFwzDIXN64mJAHZwZ0OgNupowe5jlJPmV8OIrgSDjUAeb3SZRuhsuyPKAw6S2TkUknZvErVVKbzD-rEcs-augb6_LzUE5NVtPxj_w=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 2.0,
        price: 1438.17,
        instant_price: 2.1,
        date: '12/06/2023'
      },
      {
        id: 1346792,
        title: 'Entrega Rápida',
        creator: 'Jonathan',
        image:
          'https://lh3.googleusercontent.com/pwjA4CWS9nto8fCis6JzlWwzQgtHUvLlUWcd501LsGQoVUPL5euwhir-2fjPmsJLJ_ovJ7flH_OgDEaALeZrhSXv8Puq85-lZYWuqto=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 0.8,
        price: 1278.38,
        instant_price: 0.35,
        date: '12/06/2023'
      },
    ];
  }

  ngOnInit(): void {
    this.getCategories();  
    this.getWallets();  
  }

  getLaunchsRevenue(): void {
    this.launchService.getLaunchByType(LaunchTypeEnum.Credit).subscribe({
      next: (resp) => {
        this.launchs = resp.data as launch[];
      },
      error: (error) => {
        console.error('ao obter lancamentos de entrada');
      }
    })
  }

  getWallets(): void {
    this.walletService.getWalletsForUser(LaunchTypeEnum.Credit).subscribe({
      next: (resp: ApiOutput<IWallet[]>) => {
        this.listWallets = resp.data as IWallet[];
      },
      error: (error: any) => {
        console.error('error when get categories', error);
      }
    });
  }
  getCategories(): void {
    this.launchService.getCategoriesByType(LaunchTypeEnum.Credit).subscribe({
      next: (resp: ApiOutput<ICategory[]>) => {
        this.listCategories = resp.data as ICategory[];
      },
      error: (error: any) => {
        console.error('error when get categories', error);
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.save();
  }
  
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getInput(): launchInput {
    const input: launchInput = {
      description: this.form.value.description,
      value: this.form.value.value,
      categoryId: this.form.value.category,
      isInstallment: this.form.value.isInstallment,
      launchDate: this.form.value.launchDate,
      planId: this.form.value.planId,
      walletId: this.form.value.wallet
    }
    return input;
  }

  save(): void {
    if (this.form.invalid) {
      return 
    }

    const input: launchInput = this.getInput();
    this.launchService.add(input).subscribe({
      next: (resp: any) => {
        ///launch message success
        this.getLaunchsRevenue();
      },
      error: (error: any) => {

      }
    })


  }

  getObject() {
    throw new Error('Method not implemented.');
  }

  //Date
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}