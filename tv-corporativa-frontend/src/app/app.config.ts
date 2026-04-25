import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // <-- Certifique-se de que o caminho está certo

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};