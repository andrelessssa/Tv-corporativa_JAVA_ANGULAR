package br.gov.al.arsal.tv_corporativa_api.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.model.Midia;
import br.gov.al.arsal.tv_corporativa_api.repository.MidiaRepository;

@Service
public class MidiaService {

    @Autowired
    private MidiaRepository midiaRepository;

    private final String PASTA_UPLOADS = "/app/uploads"; 

    public MidiaDTO salvarMidiaComArquivo(String nome, Integer duracao, MultipartFile arquivo) {
        try {
            String nomeOriginal = arquivo.getOriginalFilename();
            String nomeUnico = UUID.randomUUID().toString() + "_" + nomeOriginal;

            // 📁 Garante que a pasta de uploads exista
            File diretorio = new File(PASTA_UPLOADS);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }

            // 🚀 Salva o arquivo no disco
            Path caminhoDestino = Paths.get(PASTA_UPLOADS).resolve(nomeUnico);
            try (java.io.InputStream is = arquivo.getInputStream()) {
                Files.copy(is, caminhoDestino, StandardCopyOption.REPLACE_EXISTING);
            }

            // 🎯 Usamos caminho relativo! Funciona em qualquer IP de máquina ou Smart TV!
            String urlDoVideo = "/uploads/" + nomeUnico;

            Midia midia = new Midia();
            midia.setNome(nome);
            midia.setDuracaoSegundos(duracao);
            midia.setUrl(urlDoVideo);
            midia.setDataUpload(LocalDateTime.now());

            Midia midiaSalva = midiaRepository.save(midia);

            return new MidiaDTO(
                    midiaSalva.getId(),
                    midiaSalva.getNome(),
                    midiaSalva.getUrl(),
                    midiaSalva.getDuracaoSegundos(),
                    midiaSalva.getDataUpload());

        } catch (Exception e) {
            throw new RuntimeException("Erro ao realizar upload para o disco local: " + e.getMessage());
        }
    }

    public List<MidiaDTO> listarMidias() {
        List<Midia> midiasNoBanco = midiaRepository.findAll();
        return midiasNoBanco.stream()
                .map(m -> new MidiaDTO(
                        m.getId(),
                        m.getNome(),
                        m.getUrl(),
                        m.getDuracaoSegundos(),
                        m.getDataUpload()))
                .toList();
    }

    public void deletarVideo(Long id) {
        Midia midia = midiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada com ID: " + id));
        
        // 🧹 Exclui o arquivo físico do disco ao deletar da base
        try {
            String nomeArquivo = midia.getUrl().replace("/uploads/", "");
            Path caminhoArquivo = Paths.get(PASTA_UPLOADS).resolve(nomeArquivo);
            Files.deleteIfExists(caminhoArquivo);
        } catch (Exception e) {
            System.err.println("Aviso: Não foi possível deletar o arquivo físico: " + e.getMessage());
        }

        midiaRepository.delete(midia);
    }

    public long contarMidias() {
        return midiaRepository.count();
    }

    public void editarMidia(Long id, MidiaDTO midiaDTO) {
        Midia midia = midiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada com ID: " + id));

        midia.setNome(midiaDTO.nome());
        midia.setDuracaoSegundos(midiaDTO.duracaoSegundos());
        midiaRepository.save(midia);
    }
}