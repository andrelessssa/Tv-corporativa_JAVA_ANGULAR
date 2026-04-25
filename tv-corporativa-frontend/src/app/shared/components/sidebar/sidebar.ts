import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas básicas
import { RouterModule } from '@angular/router'; // <--- ESSENCIAL PARA O ROUTERLINK FUNCIONAR

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- Adicione o RouterModule aqui
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {}