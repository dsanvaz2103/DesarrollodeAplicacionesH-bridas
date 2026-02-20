import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// 1. Importamos estas utilidades (Asegúrate de incluir Drivers)
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage'; // <--- Añade esta importación

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // 2. Configuramos Ionic Storage según el punto 4.10
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__mydb', // Nombre de la base de datos de tu Skate Shop
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] // Orden de preferencia
      })
    ),
  ],
});