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

import { ConvertDateService } from '../../services/converts/convert-date.service';
import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';
import { FormUtilsService } from '../../services/form/form-utils.service';
import { Wallet } from '../wallet/interfaces/wallet.interface';
import { WalletService } from '../wallet/services/wallet.service';
import { Category } from './interfaces/category.interface';
import { launch, launchInput, LaunchTypeEnum } from './interfaces/launch.interface';
import { LaunchService } from './services/launch.service';
import { DumpComponent } from '../../components/dump/dump.component';

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
    JsonPipe,
    DumpComponent
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
  launch!: launch;

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private formUtilsService: FormUtilsService,
    private convertDateService: ConvertDateService,
    private launchService: LaunchService,
    private walletService: WalletService
    ) {
      this.categories$ = this.getCategories();
      this.wallets$ = this.getWallets();
    }
  
  ngOnInit(): void {
    this.launch = this.route.snapshot.data['launch'];

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
      .getWalletsForUser(LaunchTypeEnum.Credit)
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
      .getCategoriesByType(LaunchTypeEnum.Credit)
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
    debugger
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
}