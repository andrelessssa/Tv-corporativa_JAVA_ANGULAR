import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core'; // <--- ADICIONE ESTE IMPORT
import { routes } from './app/app.routes';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    // Isso aqui avisa ao Angular para prestar atenção nas mudanças (cliques, rotas)
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));