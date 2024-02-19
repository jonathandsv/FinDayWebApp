import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { ConvertDateService } from '../../../../services/converts/convert-date.service';
import { FormUtilsService } from '../../../../services/form/form-utils.service';
import { Wallet } from '../../../wallet/interfaces/wallet.interface';
import { WalletService } from '../../../wallet/services/wallet.service';
import { launch, launchInput } from '../../interfaces/launch.interface';
import { LaunchService } from '../../services/launch.service';
import { Category } from '../../../category/interfaces/category.interface';
import { LaunchTypeEnum } from '../../../../enums/launch.enum';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrl: './launch-form.component.scss'
})
export class LaunchFormComponent implements OnInit {
  @ViewChild('formTemplate') public formTemplate!: NgForm;
  form!: FormGroup
  currentDate = new Date();
  currenteDateObject: NgbDateStruct = { 
    year: this.currentDate.getFullYear(), 
    month: this.currentDate.getMonth() + 1, 
    day: this.currentDate.getDate() 
  };
  launchTypeEnumOptions = LaunchTypeEnum;
  listCategories: Category[] = [];
  listWallets: Wallet[] = [];

  categories$: Observable<Category[]>;
  wallets$: Observable<Wallet[]>;
  launch!: launch;

  constructor(
    private fb: NonNullableFormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formUtilsService: FormUtilsService,
    private convertDateService: ConvertDateService,
    private launchService: LaunchService,
    private walletService: WalletService
    ) {
      this.categories$ = this.getCategories();
      this.wallets$ = this.getWallets();
    }
  
  ngOnInit(): void {
    this.launch = this.activeRoute.snapshot.data['launch'];

    this.form = this.fb.group({
      description: [this.launch.description, [Validators.required]],
      value: [this.launch.value, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      wallet: ['', [Validators.required]],
      isInstallment: [this.launch.isInstallment, [Validators.required]],
      timesInstallment: [{value: this.launch.timesInstallment, disabled: this.launch.isInstallment ? true : false }],
      launchDate: [this.launch.launchDate ? 
        this.convertDateService.convertDateToNgbDateStruct(this.launch.launchDate) : 
        this.currenteDateObject, 
        [Validators.required]]
    });

    if (this.launch.isInstallment) this.setTimesInstallment();

    this.form.get('isInstallment')?.valueChanges.subscribe({
      next: () => {
        this.setTimesInstallment();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.formUtilsService.validateAllFormFields(this.form);
      return;
    }
    else {
      this.save();
    }
  }

  save(): void {
    if (this.launch.id) {
      this.update();
    }
    else {
      this.add();
    }
  }

  private add(): void {
    const input: launchInput = this.getInput();
    this.launchService.add(input).subscribe({
      next: (resp) => {
        alert('Cadastrado com sucesso');
        this.cleanForm();
      },
      error: (error) => {
        console.error('Error add launch', error);
      }
    });
  }
  
  private update(): void {
    const input: launchInput = this.getInput();
    input.id = this.launch.id;
    this.launchService.update(input).subscribe({
      next: (resp) => {
        alert('Alterado com sucesso');
      },
      error: (error) => {
        console.error('Error update launch', error);
      }
    });
  }

  getInput(): launchInput {
    const input: launchInput = {
      description: this.form.value.description,
      value: this.form.value.value,
      categoryId: this.form.value.category,
      isInstallment: this.form.value.isInstallment,
      timesInstallment: this.form.value.timesInstallment,
      launchDate: this.convertDateService.convertNgbDateStructToDate(this.form.value.launchDate),
      planId: this.form.value.planId,
      walletId: this.form.value.wallet
    }
    return input;
  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }

  getWallets(): Observable<Wallet[]> {
    return this.walletService
      .getWalletsForUser()
        .pipe(
          switchMap((resp) => of(resp.data as Wallet[])),
          tap((listWallets) => this.listWallets = listWallets),
          tap((listWallets) => this.fillWallet(listWallets)),
          catchError(val => {
            console.error(`error when get wallets`, val);
            return of([]);
           }));
  }

  getCategories(): Observable<Category[]> {
    return this.launchService
      .getCategoriesByType(LaunchTypeEnum.CREDIT)
        .pipe(
          switchMap((resp) => of(resp.data as Category[])),
          tap((listCategories) => this.listCategories = listCategories),
          tap((listCategories) => this.fillCategory(listCategories)),
          catchError(val => {
            console.error(`error when get categories`, val);
            return of([]);
           }));
  }

  fillCategory(resp: Category[]): void {
    if (this.launch.id) {
      this.form.get('category')?.setValue(resp.find(x => x.id == this.launch.categoryId)?.id);
    }
  }
  fillWallet(resp: Wallet[]): void {
    if (this.launch.id) {
      this.form.get('wallet')?.setValue(resp.find(x => x.id == this.launch.walletId)?.id);
    }
  }

  setTimesInstallment(): void {
    const isInstallment: boolean = this.form.get('isInstallment')?.value;

    if (isInstallment) {
      this.form.get('timesInstallment')?.enable();
      this.form.get('timesInstallment')?.setValidators([Validators.required, Validators.min(1)]);
      this.form.get('timesInstallment')?.updateValueAndValidity();
    }
    else {
      this.form.get('timesInstallment')?.disable();
      this.form.get('timesInstallment')?.clearValidators();
      this.form.get('timesInstallment')?.updateValueAndValidity();
    }
  }

  backToList() {
    this.router.navigate([`launch`]);
  }
}
