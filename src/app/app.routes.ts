import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
  },
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full',
  },
];
