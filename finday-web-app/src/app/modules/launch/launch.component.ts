import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss'
})
export class LaunchComponent implements OnInit {
  @ViewChild('formTemplate') public formTemplate!: NgForm;
  form!: FormGroup

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
      launchDate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {

  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }
}