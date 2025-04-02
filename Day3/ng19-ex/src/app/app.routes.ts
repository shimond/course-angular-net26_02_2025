import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'about/:x/:y', loadComponent: () => import('../app/pages/about/about.component').then(x => x.AboutComponent) },
    { path: 'search', loadComponent: () => import('../app/pages/people-search/people-search.component').then(x => x.PeopleSearchComponent) },
    { path: '', pathMatch: 'full', redirectTo: 'search' },
];
