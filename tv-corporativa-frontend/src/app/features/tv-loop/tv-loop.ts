import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidiaDTO, VideoService } from '../video/services/video'; // 👈 Buscando o service que você já criou!

@Component({
  selector: 'app-tv-loop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-loop.html',
  styleUrls: ['./tv-loop.scss']
})
export class TvLoopComponent implements OnInit {
  
  // 🎯 Captura a tag <video> do HTML para controlarmos via JavaScript
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  listaDeMidias: MidiaDTO[] = [];
  indiceAtual: number = 0; // Controla qual vídeo da lista está passando
  videoUrlAtual: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarPlaylist();
  }

  // 🔄 Busca a lista de vídeos cadastrados na sua API Java da ARSAL
  carregarPlaylist(): void {
    this.videoService.listar().subscribe({
      next: (dados) => {
        this.listaDeMidias = dados;
        if (this.listaDeMidias.length > 0) {
          this.reproduzirVideo(0); // Começa tocando o primeiro vídeo da lista (posição 0)
        }
      },
      error: (err) => console.error('Erro ao carregar a playlist da TV:', err)
    });
  }

  // 🎬 Configura o vídeo atual no player
  reproduzirVideo(index: number): void {
    this.indiceAtual = index;
    this.videoUrlAtual = this.listaDeMidias[index].url;
    console.log(`Tocando agora: ${this.listaDeMidias[index].nome} 📺`);

    // Dá um pequeno delay para o Angular atualizar a URL na tela e manda dar o Play
    setTimeout(() => {
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play().catch(err => {
          console.log('Aguardando interação do usuário ou autoplay liberado:', err);
        });
      }
    }, 100);
  }

  // 🔄 MÁGICA DO LOOP: Disparado automaticamente quando o vídeo ativo termina!
  proximoVideo(): void {
    // Se ainda houver próximos vídeos na lista, avança 1. Se chegou ao fim, volta para o 0!
    if (this.indiceAtual < this.listaDeMidias.length - 1) {
      this.reproduzirVideo(this.indiceAtual + 1);
    } else {
      console.log('Fim da playlist alcançado. Reiniciando loop infinito... 🔄🔥');
      this.reproduzirVideo(0); 
    }
  }
}