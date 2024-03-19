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
        redirectTo: 'login'
    },
    {
        path: 'launch',
        loadChildren: () => import('./modules/launch/launch.module').then(m => m.LaunchModule),
        canActivate:[privateAreaGuard]
    },
    {
        path: 'category',
        loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
        canActivate:[privateAreaGuard]
    },
    {
        path: 'wallet',
        loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule),
        canActivate:[privateAreaGuard]
    },
    {
        path: 'origin',
        loadChildren: () => import('./modules/origin/origin.module').then(m => m.OriginModule),
        canActivate:[privateAreaGuard]
    },
    {
        path: 'expenses',
        loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule),
        canActivate:[privateAreaGuard]
    },
];