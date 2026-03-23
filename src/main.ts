import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';

// --- CONFIGURACIÓN DE STORAGE ---
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage'; 

// --- CONFIGURACIÓN DE CÁMARA (PWA Elements) ---
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // <--- IMPORTANTE

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Configuración de la base de datos local
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__urbanskate_db', 
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),
  ],
}).catch((err) => console.error(err));

// --- ACTIVAR ELEMENTOS DE CÁMARA PARA NAVEGADOR ---
defineCustomElements(window); // <--- ESTO ES LO QUE HACE QUE FUNCIONE EN PC