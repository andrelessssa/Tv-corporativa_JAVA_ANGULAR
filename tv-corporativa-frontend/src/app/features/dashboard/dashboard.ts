import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video/services/video'; // Verifique se o caminho está certo

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  totalVideos: number = 0;

  // O SEGREDO ESTÁ AQUI: Você precisa injetar o serviço no construtor
  constructor(private videoService: VideoService) {} 

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas(): void {
    
    this.videoService.buscarTotalMidias().subscribe({
      next: (total) => {
        this.totalVideos = total;
      },
      error: (err) => console.error('Erro ao buscar total:', err)
    });
  }
}