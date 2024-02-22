import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../../../components/toast/toast.service';
import { ConvertDateService } from '../../../../services/converts/convert-date.service';
import { FormUtilsService } from '../../../../services/form/form-utils.service';
import { Origin, OriginInput } from '../../interfaces/origin.interface';
import { OriginService } from '../../services/origin.service';

@Component({
  selector: 'app-origin-form',
  templateUrl: './origin-form.component.html',
  styleUrl: './origin-form.component.scss'
})
export class OriginFormComponent {
  @ViewChild('formTemplate') public formTemplate!: NgForm;
  form!: FormGroup
  currentDate = new Date();
  currenteDateObject: NgbDateStruct = { 
    year: this.currentDate.getFullYear(), 
    month: this.currentDate.getMonth() + 1, 
    day: this.currentDate.getDate() 
  };
  origin!: Origin;

  constructor(private fb: NonNullableFormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formUtilsService: FormUtilsService,
    private convertDateService: ConvertDateService,
    private toastService: ToastService,
    private originService: OriginService
  ) {

  }

  ngOnInit(): void {
    this.origin = this.activeRoute.snapshot.data['origin'];

    this.form = this.fb.group({
      description: [this.origin.description, [Validators.required]],
      name: [this.origin.name, [Validators.required]],
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
    if (this.origin.id) {
      this.update();
    }
    else {
      this.add();
    }
  }

  private add(): void {
    const input: OriginInput = this.getInput();
    this.originService.add(input).subscribe({
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
    const input: OriginInput = this.getInput();
    input.id = this.origin.id;
    this.originService.update(input).subscribe({
      next: (resp) => {
        this.toastService.show({ message: `Alterado com sucesso`, classname: 'bg-success text-light', delay: 3000 });
      },
      error: (error: any) => {
        console.error('Error update launch', error);
      }
    });
  }

  getInput(): OriginInput {
    const input: OriginInput = {
      name: this.form.value.name,
      description: this.form.value.description
    };
    debugger;
    return input;
  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }

  backToList() {
    this.router.navigate([`origin`]);
  }
}