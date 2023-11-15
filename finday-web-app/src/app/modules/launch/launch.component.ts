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

import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';
import { FormUtilsService } from '../../services/form/form-utils.service';

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

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private formUtilsService: FormUtilsService
    ) {}
  
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
    throw new Error('Method not implemented.');
  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }
}