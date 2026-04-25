import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Adicione isso se não tiver
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // DECLARE A VARIÁVEL AQUI PARA O HTML PARAR DE RECLAMAR
  totalVideos: number = 0; 
}