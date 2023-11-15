import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbAlertModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { CustomAdapter, CustomDateParserFormatter } from '../../services/datepicker-adapter.service';
import { DumpComponent } from '../../components/dump/dump.component';
import { CustomDatepickerI18n, I18n } from '../../services/datepicker-i18n.service';

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

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private location: Location
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

  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }
}