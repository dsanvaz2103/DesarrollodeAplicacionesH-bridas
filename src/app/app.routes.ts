import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then(m => m.FolderPage),
  },
  {
    path: 'detalle-producto/:id',
    loadComponent: () => import('./pages/detalle-producto/detalle-producto.page').then(m => m.DetalleProductoPage)
  },
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full'
  }
];
