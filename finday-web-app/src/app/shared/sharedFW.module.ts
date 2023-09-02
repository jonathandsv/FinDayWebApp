import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, ClickOutsideDirective],
})
export class SharedModule {}

// import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { ListboxModule } from 'primeng/listbox';
// import { PickListModule } from 'primeng/picklist';
// import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
// import { FieldErrorsComponent } from './components/field-errors/field-errors.component';
// import { InputDateComponent } from './components/input-date/input-date.component';
// import { ListboxCommonComponent } from './components/listbox-common/listbox-common.component';
// import { TableComponent } from './components/table/table.component';
// import { TituloNovoComponent } from './components/titulo-novo/titulo-novo.component';
// import { UploadListarArquivoComponent } from './components/upload-listar-arquivo/upload-listar-arquivo.component';
// import { TableWithExpandComponent } from './components/table-with-expand/table-with-expand.component';
// import { PermissaoDirective } from './directives/permissao/permissao.directive';
// import { PrimeNgModule } from './prime-ng.module';
// import { DropdownComponent } from './components/dropdown/dropdown.component';
// import { MascaraDinheiroDirective } from './directives/mascara.dinheiro.directive';
// import { DumpComponent } from './components/dump/dump.component';
// import { OasisTableComponent } from './components/table/oasis-table/oasis-table.component';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { OasisPaginationComponent } from './components/table/oasis-pagination/oasis-pagination.component';
// import { ComentariosComponent } from './components/comentarios/comentarios.component';
// import { ComentarioComponent } from './components/comentarios/comentario/comentario.component';
// import { ComentarioFormComponent } from './components/comentarios/comentario-form/comentario-form.component';
// import { EtiquetasComponent } from './components/comentarios/components/etiquetas/etiquetas.component';
// import { PopoverModule } from 'ngx-bootstrap/popover';

// const components = [
//   FieldErrorsComponent,
//   InputDateComponent,
//   TituloNovoComponent,
//   TableComponent,
//   TableWithExpandComponent,
//   AutocompleteComponent,
//   ListboxCommonComponent,
//   UploadListarArquivoComponent,
//   PermissaoDirective,
//   MascaraDinheiroDirective,
//   DropdownComponent,
//   DumpComponent,
//   OasisTableComponent,
//   OasisPaginationComponent,
//   ComentariosComponent,
//   ComentarioComponent,
//   ComentarioFormComponent,
//   EtiquetasComponent,
// ];
// @NgModule({
//   declarations: [
//     ...components
//   ],
//   imports: [
//     FormsModule,
//     ReactiveFormsModule,
//     CommonModule,
//     RouterModule,
//     PrimeNgModule,
//     ListboxModule,
//     PickListModule,
//     PaginationModule.forRoot(),
//     // NgbModule
//     PopoverModule.forRoot(),
//   ],
//   schemas: [
//     CUSTOM_ELEMENTS_SCHEMA
//   ],
//   exports: [
//     ...components,
//     PrimeNgModule,
//   ],
// })
// export class SharedModuleFW { }
