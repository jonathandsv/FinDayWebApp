import { CommonModule, JsonPipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';
import { FormUtilsService } from '../../services/form/form-utils.service';
import { Wallet } from '../wallet/interfaces/wallet.interface';
import { WalletService } from '../wallet/services/wallet.service';
import { Category } from './interfaces/category.interface';
import { launchInput, LaunchTypeEnum } from './interfaces/launch.interface';
import { LaunchService } from './services/launch.service';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbAlertModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    JsonPipe
  ],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss',
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
	],
})
export class LaunchComponent implements OnInit {
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

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private formUtilsService: FormUtilsService,
    private launchService: LaunchService,
    private walletService: WalletService
    ) {
      this.categories$ = this.getCategories();
      this.wallets$ = this.getWallets();
    }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required]],
      value: ['', [Validators.required]],
      category: ['', [Validators.required]],
      wallet: ['', [Validators.required]],
      isInstallment: [false, [Validators.required]],
      timesInstallment: [0, [Validators.required]],
      launchDate: [this.currenteDateObject, [Validators.required]]
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
    const input: launchInput = this.getInput();
    this.launchService.add(input).subscribe({
      next: (resp) => {
        alert('Cadastrado com sucesso');
        this.cleanForm();
      },
      error: (error) => {
        console.error('Error add launch', error);
      }
    })
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

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }

  getWallets(): Observable<Wallet[]> {
    return this.walletService
      .getWalletsForUser(LaunchTypeEnum.Credit)
        .pipe(
          tap((resp) => this.listWallets = resp.data as Wallet[]),
          switchMap((resp) => of(resp.data as Wallet[])),
          catchError(val => {
            console.error(`error when get wallets`, val);
            return of([]);
           }));
  }

  getCategories(): Observable<Category[]> {
    return this.launchService
      .getCategoriesByType(LaunchTypeEnum.Credit)
        .pipe(
          tap((resp) => this.listCategories = resp.data as Category[]),
          switchMap((resp) => of(resp.data as Category[])),
          catchError(val => {
            console.error(`error when get categories`, val);
            return of([]);
           }));
  }
}