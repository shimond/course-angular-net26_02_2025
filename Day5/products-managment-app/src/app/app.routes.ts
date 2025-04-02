import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'admin-products', loadComponent:() => import('./pages/admin/manage-products/manage-products.component').then(x=>x.ManageProductsComponent)},
    {path:'products', loadComponent:() => import('./pages/product-live-list/product-live-list.component').then(x=>x.ProductLiveListComponent)},
    {path:'', redirectTo:'products', pathMatch:'full', canMatch:[]}
];
