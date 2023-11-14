import { Routes } from '@angular/router';
import { LaunchComponent } from './modules/launch/launch.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'launch',
        component: LaunchComponent
    }
];