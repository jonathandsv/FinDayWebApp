import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'launch' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'launch',
        loadChildren: () => import('./module/launch/launch.module')
        .then(m => m.LaunchModule),
        // canActivate: [PrivateAreaGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
