import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidiaDTO, VideoService } from '../video/services/video';

@Component({
  selector: 'app-tv-loop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-loop.html',
  styleUrls: ['./tv-loop.scss']
})
export class TvLoopComponent implements OnInit, OnDestroy {
  
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  listaDeMidias: MidiaDTO[] = [];
  indiceAtual: number = 0;
  videoUrlAtual: string = '';

  private watchdogTimer: any;
  private autoReloadTimer: any;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarPlaylist();

    // 🔄 Recarrega a página automaticamente a cada 4 horas para esvaziar a RAM das Smart TVs (Samsung/TCL)
    this.autoReloadTimer = setInterval(() => {
      window.location.reload();
    }, 4 * 60 * 60 * 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.watchdogTimer);
    clearInterval(this.autoReloadTimer);
  }

  // 🔄 Busca a lista de vídeos cadastrados na API Java da ARSAL e atualiza a grade
  carregarPlaylist(forcarInicio: boolean = false): void {
    this.videoService.listar().subscribe({
      next: (dados) => {
        if (dados && dados.length > 0) {
          this.listaDeMidias = dados;
          
          // Se for a primeira carga OU se chegou ao fim da playlist, toca o primeiro vídeo (índice 0)
          if (!this.videoUrlAtual || forcarInicio) {
            this.reproduzirVideo(0);
          }
        } else {
          this.videoUrlAtual = '';
          // Se o banco estiver sem vídeos, tenta buscar novamente em 10 segundos
          setTimeout(() => this.carregarPlaylist(), 10000);
        }
      },
      error: (err) => {
        console.error('⚠️ Erro ao carregar a playlist da TV:', err);
        // Se a API oscilar no recomeço, toca o vídeo 0 da playlist em memória para a TV não parar
        if (forcarInicio && this.listaDeMidias.length > 0) {
          this.reproduzirVideo(0);
        } else {
          setTimeout(() => this.carregarPlaylist(), 10000);
        }
      }
    });
  }

  // 🎬 Configura e executa o vídeo atual no player
  reproduzirVideo(index: number): void {
    if (this.listaDeMidias.length === 0) return;

    this.indiceAtual = index;
    const midia = this.listaDeMidias[index];
    this.videoUrlAtual = midia.url;
    
    console.log(`Tocando agora: ${midia.nome} 📺`);

    setTimeout(() => {
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        const player = this.videoPlayer.nativeElement;
        
        player.load();
        player.play().catch(err => {
          console.warn('⚠️ Autoplay travou ou foi bloqueado pela TV. Pulando para o próximo...', err);
          this.proximoVideo();
        });

        // 🐕 Ativa o timer de segurança (Watchdog) para evitar tela preta travada
        const duracao = midia.duracaoSegundos || 30;
        this.iniciarWatchdog(duracao);
      }
    }, 200);
  }

  // 🔄 MÁGICA DO LOOP: Disparado automaticamente quando o vídeo ativo termina!
  proximoVideo(): void {
    clearTimeout(this.watchdogTimer);

    // 🧹 LIMPEZA DE MEMÓRIA CRÍTICA (Descarrega o buffer da RAM da Smart TV):
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const player = this.videoPlayer.nativeElement;
      player.pause();
      player.removeAttribute('src'); 
      player.load();
    }

    // Se ainda houver próximos vídeos na lista, avança 1. 
    // Se chegou ao fim, busca a lista nova do banco e recomeça do vídeo 0!
    if (this.indiceAtual < this.listaDeMidias.length - 1) {
      this.reproduzirVideo(this.indiceAtual + 1);
    } else {
      console.log('Fim da playlist alcançado. Atualizando grade e reiniciando loop... 🔄🔥');
      this.carregarPlaylist(true); // 👈 Força a tocar o vídeo 0 da playlist atualizada!
    }
  }

  // ⚠️ Se um vídeo for excluído do servidor ou der erro de streaming, pula para o próximo
  tratarErroVideo(event: any): void {
    console.warn('⚠️ Erro ao carregar a mídia atual na TV. Pulando para a próxima...', event);
    this.proximoVideo();
  }

  // 🐕 Watchdog: Se a TV travar e não disparar o evento (ended), força o avanço automático
  private iniciarWatchdog(duracaoSegundos: number): void {
    clearTimeout(this.watchdogTimer);

    // Concede margem de 5 segundos além da duração cadastrada do vídeo
    const tempoLimite = (duracaoSegundos + 5) * 1000;

    this.watchdogTimer = setTimeout(() => {
      console.warn('⚠️ Watchdog acionado: O vídeo travou na tela preta. Forçando avanço...');
      this.proximoVideo();
    }, tempoLimite);
  }
}