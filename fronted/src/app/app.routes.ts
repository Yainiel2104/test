import { Routes } from '@angular/router';
import { ProductoPage } from './Pages/producto-page/producto-page';
import { HomePage } from './Pages/home-page/home-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'producto/:id', component: ProductoPage },
    { path: '**', component: HomePage },
];
