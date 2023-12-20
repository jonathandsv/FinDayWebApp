import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { launchResolver } from './guards/launch.resolver';
import { LaunchComponent } from './launch.component';
import { LaunchFormComponent } from './containers/launch-form/launch-form.component';

const routes: Routes = [
    { path: '', component: LaunchComponent },
    {
        path: 'new',
        component: LaunchFormComponent, resolve: { launch: launchResolver}
    },
    {
        path: 'edit/:id',
        component: LaunchFormComponent, resolve: { launch: launchResolver}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaunchRoutingModule { }