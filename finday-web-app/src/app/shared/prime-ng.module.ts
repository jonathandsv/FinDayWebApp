import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CardModule,
    AccordionModule,
    TableModule,
    SplitButtonModule,
    DividerModule,
    ButtonModule,
    CalendarModule,
    SharedModule,
    TabViewModule,
    InputTextModule,
    AutoCompleteModule,
    InputSwitchModule,
    ChipsModule,
    ToastModule,
    ImageModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextareaModule,
    InputNumberModule,
    ConfirmDialogModule,
    MultiSelectModule,
    AccordionModule,
    PaginatorModule,
    EditorModule,
    DialogModule,
    TreeModule,
    StepsModule
  ]
})
export class PrimeNgModule { }
