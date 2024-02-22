import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OriginListComponent } from './components/origin-list/origin-list.component';
import { OriginFormComponent } from './containers/origin-form/origin-form.component';
import { originResolver } from './guards/origin.resolver';

const routes: Routes = [
    { path: '', component: OriginListComponent },
    {
        path: 'new',
        component: OriginFormComponent, resolve: { origin: originResolver}
    },
    {
        path: 'edit/:id',
        component: OriginFormComponent, resolve: { origin: originResolver}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OriginRoutingModule { }