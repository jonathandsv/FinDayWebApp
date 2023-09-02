import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeviewComponent } from './treeview.component';
import { TreeviewConfig } from './models/treeview-config';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './helpers/treeview-event-parser';
import { TreeviewI18n, DefaultTreeviewI18n } from './models/treeview-i18n';
import { TreeviewPipe } from './pipes/treeview.pipe';
import { TreeviewItemComponent } from './treeview-item/treeview-item.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    TreeviewComponent,
    TreeviewItemComponent,
    TreeviewPipe,
  ],
  exports: [
    TreeviewComponent,
    TreeviewItemComponent,
    TreeviewPipe,
  ]
})
export class TreeviewModule {
  static forRoot(): ModuleWithProviders<TreeviewModule> {
    return {
      ngModule: TreeviewModule,
      providers: [
        TreeviewConfig,
        { provide: TreeviewI18n, useClass: DefaultTreeviewI18n },
        { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
      ]
    };
  }
}
