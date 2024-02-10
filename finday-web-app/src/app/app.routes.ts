import { Routes } from '@angular/router';
import { LoginComponent } from './modules/account/login/login.component';
import { privateAreaGuard } from './guards/private-area.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'launchs'
    },
    {
        path: 'launch',
        loadChildren: () => import('./modules/launch/launch.module').then(m => m.LaunchModule),
        canActivate:[privateAreaGuard]
    },
];