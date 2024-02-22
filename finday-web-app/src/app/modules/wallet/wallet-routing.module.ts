import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletFormComponent } from './containers/wallet-form/wallet-form.component';
import { WalletListComponent } from './components/wallet-list/wallet-list.component';
import { walletResolver } from './guards/wallet.resolver';

const routes: Routes = [
    { path: '', component: WalletListComponent },
    {
        path: 'new',
        component: WalletFormComponent, resolve: { wallet: walletResolver}
    },
    {
        path: 'edit/:id',
        component: WalletFormComponent, resolve: { wallet: walletResolver}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule { }