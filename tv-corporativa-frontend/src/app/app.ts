import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 Essencial para usar o *ngIf
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Dashboard } from './features/dashboard/dashboard';
import { Video } from './features/video/video';
import { Dispositivos } from './features/dispositivos/dispositivos';
import { Midia } from './components/midia/midia';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // 👈 Adicionado aqui!
    RouterModule,
    RouterOutlet,
    Sidebar,
    Dashboard,
    Video,
    Dispositivos,
    Midia
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'tv-arsal-front';

  // 🔌 Injeta o Router para monitorar a URL da tela ativa
  constructor(private router: Router) {}

 // 🕵️‍♂️ Regra atualizada com os caminhos reais das suas rotas!
  deveExibirSidebar(): boolean {
    const perfil = localStorage.getItem('perfilUser');
    const rotaAtual = this.router.url;

    // Só exibe a barra lateral se for ADMIN e estiver nas telas de gerenciamento
    return perfil === 'ADMIN' && (
      rotaAtual === '/dashboard' || 
      rotaAtual === '/videos' || 
      rotaAtual === '/dispositivos'
    );
  }
}