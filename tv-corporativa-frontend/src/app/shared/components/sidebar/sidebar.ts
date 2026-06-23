import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Importante importar o Router!
import { RouterModule } from '@angular/router'; // Para os routerLink funcionarem

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule], // Garante que as rotas funcionam na sidebar
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {

  // 📥 Injeta o Router no construtor para podermos navegar entre as telas
  constructor(private router: Router) {}

  // 🚪 Função que o HTML estava procurando!
  logout() {
    localStorage.removeItem('perfilUser'); // Limpa o usuário logado 🧽
    this.router.navigate(['/']); // Redireciona para a tela de login!
  }
}