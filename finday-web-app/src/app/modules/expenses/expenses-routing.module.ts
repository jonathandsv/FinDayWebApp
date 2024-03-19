import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
    { path: '', component: ExpensesComponent },
    // {
    //     path: 'new',
    //     component: LaunchFormComponent, resolve: { launch: launchResolver}
    // },
    // {
    //     path: 'edit/:id',
    //     component: LaunchFormComponent, resolve: { launch: launchResolver}
    // }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaunchRoutingModule { }