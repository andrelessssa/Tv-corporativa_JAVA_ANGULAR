import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login'; // 
import { Dashboard } from './features/dashboard/dashboard';
import { Video } from './features/video/video';
import { Dispositivos } from './features/dispositivos/dispositivos';
import { TvLoopComponent } from './features/tv-loop/tv-loop'; // 

export const routes: Routes = [
  // 1. 🔒 Rota raiz agora é o LOGIN! Quando abrir o sistema, para aqui primeiro.
  { path: '', component: LoginComponent }, 
  
  // 2. 📊 Rotas do Painel Administrativo (Acessadas após logar como admin)
  { path: 'dashboard', component: Dashboard },
  { path: 'videos', component: Video }, // Sua tela de Gestão mantida idêntica!
  { path: 'dispositivos', component: Dispositivos },

  // 3. 📺 Rota da TV: Modo Quiosque em Tela Cheia sem menu e sem sidebar
  { path: 'tv-loop', component: TvLoopComponent },

  // 🔄 Rota curinga: Se o usuário digitar qualquer besteira na URL, joga pro Login
  { path: '**', redirectTo: '' }
];