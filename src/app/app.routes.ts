import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page'),
  },
  {
    path: 'other',
    loadComponent: () => import('./pages/other/other.page'),
  },
  {
    path: 'books', 
    loadComponent: () => import('./pages/books/books.page'),
  },
  {
    path: '**',
    redirectTo: 'books',
    pathMatch: 'full'
  }
]
