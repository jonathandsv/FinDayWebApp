import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './containers/category-form/category-form.component';
import { categoryResolver } from './guards/category.resolver';

const routes: Routes = [
    { path: '', component: CategoryListComponent },
    {
        path: 'new',
        component: CategoryFormComponent, resolve: { category: categoryResolver}
    },
    {
        path: 'edit/:id',
        component: CategoryFormComponent, resolve: { category: categoryResolver}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }