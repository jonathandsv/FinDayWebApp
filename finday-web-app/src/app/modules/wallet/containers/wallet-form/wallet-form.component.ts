import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../../../components/toast/toast.service';
import { listWalletTypeEnum, WalletTypeEnum } from '../../../../enums/wallet.enum';
import { ConvertDateService } from '../../../../services/converts/convert-date.service';
import { FormUtilsService } from '../../../../services/form/form-utils.service';
import { Wallet, WalletInput } from '../../interfaces/wallet.interface';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrl: './wallet-form.component.scss'
})
export class WalletFormComponent {
  @ViewChild('formTemplate') public formTemplate!: NgForm;
  form!: FormGroup
  currentDate = new Date();
  currenteDateObject: NgbDateStruct = { 
    year: this.currentDate.getFullYear(), 
    month: this.currentDate.getMonth() + 1, 
    day: this.currentDate.getDate() 
  };
  wallet!: Wallet;
  walletTypeEnumOptions = WalletTypeEnum;
  listWalletType = listWalletTypeEnum

  constructor(private fb: NonNullableFormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formUtilsService: FormUtilsService,
    private convertDateService: ConvertDateService,
    private toastService: ToastService,
    private walletService: WalletService
  ) {

  }

  ngOnInit(): void {
    this.wallet = this.activeRoute.snapshot.data['wallet'];

    this.form = this.fb.group({
      name: [this.wallet.name, [Validators.required]],
      description: [this.wallet.description, [Validators.required]],
      type: [{ value: this.wallet.type ? this.wallet.type : '', 
        disabled: this.wallet.id ? true : false
      }, [Validators.required]],
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
    if (this.wallet.id) {
      this.update();
    }
    else {
      this.add();
    }
  }

  private add(): void {
    const input: WalletInput = this.getInput();
    this.walletService.add(input).subscribe({
      next: (resp) => {
        this.toastService.show({ message: `Cadastrado com sucesso`, classname: 'bg-success text-light', delay: 3000 });
        this.cleanForm();
      },
      error: (error) => {
        console.error('Error add launch', error);
      }
    });
  }
  
  private update(): void {
    debugger
    const input: WalletInput = this.getInput();
    input.id = this.wallet.id;
    this.walletService.update(input).subscribe({
      next: (resp) => {
        this.toastService.show({ message: `Alterado com sucesso`, classname: 'bg-success text-light', delay: 3000 });
      },
      error: (error: any) => {
        console.error('Error update launch', error);
      }
    });
  }

  getInput(): WalletInput {
    const input: WalletInput = {
      name: this.form.value.name,
      description: this.form.value.description,
      type: this.form.get('type')?.value,
    };
    debugger;
    return input;
  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }

  backToList() {
    this.router.navigate([`wallet`]);
  }
}
