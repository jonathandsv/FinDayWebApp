import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/sharedFW.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutDefaultComponent } from './layout-default.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  exports: [
    LayoutDefaultComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LayoutDefaultModule {}
