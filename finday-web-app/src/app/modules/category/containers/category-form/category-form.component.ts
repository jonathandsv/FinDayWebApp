import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ConvertDateService } from '../../../../services/converts/convert-date.service';
import { FormUtilsService } from '../../../../services/form/form-utils.service';
import { Category, categoryInput } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('formTemplate') public formTemplate!: NgForm;
  form!: FormGroup
  currentDate = new Date();
  currenteDateObject: NgbDateStruct = { 
    year: this.currentDate.getFullYear(), 
    month: this.currentDate.getMonth() + 1, 
    day: this.currentDate.getDate() 
  };
  category!: Category;

  constructor(private fb: NonNullableFormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formUtilsService: FormUtilsService,
    private convertDateService: ConvertDateService,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.category = this.activeRoute.snapshot.data['category'];

    this.form = this.fb.group({
      description: [this.category.description, [Validators.required]],
      name: [this.category.name, [Validators.required]],
      type: [this.category.type, [Validators.required]],
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
    if (this.category.id) {
      this.update();
    }
    else {
      this.add();
    }
  }

  private add(): void {
    const input: categoryInput = this.getInput();
    this.categoryService.add(input).subscribe({
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
    const input: categoryInput = this.getInput();
    input.id = this.category.id;
    this.categoryService.update(input).subscribe({
      next: (resp) => {
        alert('Alterado com sucesso');
      },
      error: (error: any) => {
        console.error('Error update launch', error);
      }
    });
  }

  getInput(): categoryInput {
    const input: categoryInput = {
      name: this.form.value.name,
      description: this.form.value.description,
      type: this.form.value.type
    }
    return input;
  }

  cleanForm(): void {
    this.form.reset();
    this.formTemplate.resetForm();
  }

  backToList() {
    this.router.navigate([`category`]);
  }
}