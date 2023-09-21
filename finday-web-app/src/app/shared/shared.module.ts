import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DumpComponent } from './components/dump/dump.component';

@NgModule({
  declarations: [
    FieldErrorsComponent,
    DumpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    FieldErrorsComponent,
    DumpComponent
  ],
})
export class SharedModule {}