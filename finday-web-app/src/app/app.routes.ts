import { Routes } from '@angular/router';
import { LaunchComponent } from './modules/launch/launch.component';
import { AppComponent } from './app.component';
import { launchResolver } from './modules/launch/guards/launch.resolver';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'launch',
        component: LaunchComponent, resolve: { launch: launchResolver}
    },
    {
        path: 'launch/edit/:id',
        component: LaunchComponent, resolve: { launch: launchResolver}
    }

];