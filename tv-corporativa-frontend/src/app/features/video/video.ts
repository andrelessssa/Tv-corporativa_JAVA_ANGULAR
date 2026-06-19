import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidiaDTO, VideoService } from './services/video';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.html',
  styleUrls: ['./video.scss']
})
export class Video implements OnInit {
  
  listaDeMidias: MidiaDTO[] = [];
  exibirFormulario: boolean = false; 
  midiaSelecionada: MidiaDTO | null = null;

  // 🌟 LINHA NOVA 1: Cria a caixinha na memória para segurar o arquivo .mp4 do modal
  arquivoSelecionado: File | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarMidias();
  }

  // 🌟 LINHA NOVA 2: Função que captura o arquivo quando o usuário escolhe no modal
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];
      console.log('Vídeo selecionado para upload:', this.arquivoSelecionado.name);
    }
  }

  // 🌟 ALTERADO: Agora recebe apenas nome e duracao, pois a URL quem gera é o Java!
  enviarDados(nome: string, duracao: any) {
    if (!this.arquivoSelecionado) {
      alert('Por favor, selecione um arquivo de vídeo .mp4 antes de salvar! 🚫');
      return;
    }

    // 1. Criamos a caixa de papelão Multipart (FormData)
    const formData = new FormData();
    
    // 2. Colocamos o arquivo físico e os textos dentro dela
    // ATENÇÃO: Esses nomes têm que bater idênticos com o @RequestParam do seu Controller no Java!
    formData.append('file', this.arquivoSelecionado);
    formData.append('nome', nome);
    formData.append('duracaoSegundos', String(duracao));

    console.log('Enviando pacote completo para o Java na ARSAL...');

    // 3. Chamamos o serviço passando o nosso formData completo
    this.videoService.salvar(formData).subscribe({
      next: (res) => {
        console.log('Vídeo gravado e salvo na pasta C:/arsal_midias/ com sucesso! 🎯🎉');
        this.exibirFormulario = false;
        this.arquivoSelecionado = null; // Limpa a caixinha para o próximo upload
        this.carregarMidias();
      },
      error: (err) => console.error('Erro ao fazer upload da mídia:', err)
    });
  }

  carregarMidias(): void {
    this.videoService.listar().subscribe({
      next: (dados) => this.listaDeMidias = dados,
      error: (err) => console.error(err)
    });
  }

  excluirVideo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este vídeo?')) {
      this.videoService.excluirVideo(id).subscribe({
        next: () => {
          console.log('Vídeo excluído com sucesso! 🗑️');
          this.carregarMidias();
        },
        error: (err) => console.error('Erro ao excluir vídeo:', err)
      });
    }
  }

  prepararEdicao(midia: MidiaDTO): void {
    this.midiaSelecionada = { ...midia };
    this.exibirFormulario = true;
    console.log('Preparando edição para:', this.midiaSelecionada);
  }

  // Mantido para alterar apenas os dados cadastrais se necessário
  salvarEdicao(nome: string, duracao: any): void {
    if (this.midiaSelecionada?.id) {
      const midiaAtualizada: MidiaDTO = {
        id: this.midiaSelecionada.id,
        nome: nome,
        url: this.midiaSelecionada.url, // Mantém a URL do arquivo que já existe
        duracaoSegundos: Number(duracao)
      };

      this.videoService.editarMidia(this.midiaSelecionada.id, midiaAtualizada).subscribe({
        next: () => {
          console.log('Mídia editada no Postgres! ✏️🎯');
          this.exibirFormulario = false; 
          this.midiaSelecionada = null;  
          this.carregarMidias();         
        },
        error: (err) => console.error('Erro ao editar:', err)
      });
    }
  }
}