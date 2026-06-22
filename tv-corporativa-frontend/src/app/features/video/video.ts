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

  // 📦 Caixinha na memória para segurar o arquivo de vídeo .mp4
  arquivoSelecionado: File | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.carregarMidias();
  }

  // 🎬 Captura o arquivo físico quando o usuário escolhe no explorador de arquivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];
      console.log('Vídeo selecionado para upload:', this.arquivoSelecionado.name);
    }
  }

  // 🚀 Envia o pacote completo (Multipart) para o Spring Boot
  enviarDados(nome: string, duracao: any) {
    if (!this.arquivoSelecionado) {
      alert('Por favor, selecione um arquivo de vídeo .mp4 antes de salvar! 🚫');
      return;
    }

    // 1. Criamos o contêiner FormData (Multipart)
    const formData = new FormData();
    
    // 2. Inserimos as chaves de texto e o binário do arquivo
    // 🌟 AJUSTADO: 'arquivo' batendo idêntico com o @RequestParam do Java!
    formData.append('arquivo', this.arquivoSelecionado);
    formData.append('nome', nome);
    formData.append('duracaoSegundos', String(duracao));

    console.log('Enviando pacote completo para o Java na ARSAL...');

    // 3. Dispara o serviço passando o formData
    this.videoService.salvar(formData).subscribe({
      next: (res) => {
        console.log('Vídeo gravado e salvo com sucesso! 🎯🎉');
        this.exibirFormulario = false;
        this.arquivoSelecionado = null; // Limpa a caixinha do arquivo para o próximo upload
        this.carregarMidias(); // Recarrega a tabela de mídias na tela
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

  // Altera apenas os dados cadastrais (Nome e Duração) se necessário
  salvarEdicao(nome: string, duracao: any): void {
    if (this.midiaSelecionada?.id) {
      const midiaAtualizada: MidiaDTO = {
        id: this.midiaSelecionada.id,
        nome: nome,
        url: this.midiaSelecionada.url, // Mantém a URL do streaming do arquivo já existente
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