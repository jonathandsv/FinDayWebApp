import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: '',
            component: LoginComponent,
          },
        //   {
        //     path: 'register',
        //     component: RegisterComponent,
        //   },
        //   {
        //     path: 'forgot-password',
        //     component: ForgotPasswordComponent,
        //     canActivate: [AccountGuard],
        //     canDeactivate: [AccountGuard]
        //   },
        //   {
        //     path: 'reset-password/:token',
        //     component: ResetPasswordComponent,
        //     canActivate: [AccountGuard],
        //     canDeactivate: [AccountGuard]
        //   },
        //   {
        //     path: 'active-account/:email/:activationCode',
        //     component: ConfirmAccountComponent,
        //     canActivate: [AccountGuard],
        //     canDeactivate: [AccountGuard]
        //   },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }