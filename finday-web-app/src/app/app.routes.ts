import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'launchs'
    },
    {
        path: 'launch',
        loadChildren: () => import('./modules/launch/launch.module').then(m => m.LaunchModule)
    }
];