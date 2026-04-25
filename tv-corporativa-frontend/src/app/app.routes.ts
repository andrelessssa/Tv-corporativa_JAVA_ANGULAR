import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Video } from './features/video/video';
import { Dispositivos } from './features/dispositivos/dispositivos';

export const routes: Routes = [
  // Esta linha é quem tira a tela preta e joga para o Dashboard logo de cara
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  
  { path: 'dashboard', component: Dashboard },
  { path: 'videos', component: Video },
  { path: 'dispositivos', component: Dispositivos }
];