import { Routes } from '@angular/router';

export const routes: Routes = [
  // FolderPage con parámetro dinámico
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
  },
  // AboutPage
  {
    path: 'about',
    loadComponent: () => import('./folder/folder.page').then(m => m.AboutPage),
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full',
  },
];
