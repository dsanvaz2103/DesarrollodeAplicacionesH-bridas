import { Routes } from '@angular/router';

export const routes: Routes = [

  // 🔹 DETALLE DE PRODUCTO (ruta específica → VA PRIMERO)
  {
    path: 'detalle-producto/:id',
    loadComponent: () =>
      import('./pages/detalle-producto/detalle-producto.page')
        .then(m => m.DetalleProductoPage)
  },

  // 🔹 FOLDER (ruta genérica → VA DESPUÉS)
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page')
        .then(m => m.FolderPage)
  },

  // 🔹 REDIRECCIÓN POR DEFECTO
  {
    path: '',
    redirectTo: 'folder/inicio',
    pathMatch: 'full'
  },
  {
    path: 'ajustes',
    loadComponent: () => import('./pages/ajustes/ajustes.page').then( m => m.AjustesPage)
  }
];
