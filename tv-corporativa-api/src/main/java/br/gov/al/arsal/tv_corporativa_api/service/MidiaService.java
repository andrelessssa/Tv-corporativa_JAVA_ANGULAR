package br.gov.al.arsal.tv_corporativa_api.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.model.Midia;
import br.gov.al.arsal.tv_corporativa_api.repository.MidiaRepository;

@Service
public class MidiaService {

    @Autowired
    private MidiaRepository midiaRepository;

    @Value("${arsal.upload.diretorio}")
    private String diretorioUpload;

    public MidiaDTO salvarMidiaComArquivo(String nome, Integer duracao, MultipartFile arquivo) {
        try {
            Path pasta = Paths.get(diretorioUpload);
            if (!Files.exists(pasta)) {
                Files.createDirectories(pasta);
            }

            String nomeOriginal = arquivo.getOriginalFilename();
            String nomeUnico = UUID.randomUUID().toString() + "_" + nomeOriginal;
            Path caminhoCompleto = pasta.resolve(nomeUnico);

            // 🎯 FORÇA A GRAVAÇÃO DO BUFFER ATÉ O FIM DO FLUXO:
            try (java.io.InputStream is = arquivo.getInputStream()) {
                Files.copy(is, caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);
            }

            // 🎯 VALIDAÇÃO DE INTEGRIDADE: Garante que o arquivo foi escrito e não está vazio
            if (!Files.exists(caminhoCompleto) || Files.size(caminhoCompleto) == 0) {
                throw new RuntimeException("Falha catastrófica: O arquivo de mídia foi gravado com 0 bytes no servidor.");
            }

            // 🎯 Substitua pelo IP real da sua máquina na rede interna da ARSAL
            String urlDoVideo = "http://192.168.1.104:8080/api/midias/stream/" + nomeUnico;

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
                midiaSalva.getDataUpload()
            );

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar o arquivo de vídeo no servidor: " + e.getMessage());
        }
    }

       
    

    public List<MidiaDTO> listarMidias() {
        List<Midia> midiasNoBanco = midiaRepository.findAll();
        // 🎯 Perfeito para Record: Construtor posicional para cada item da lista
        return midiasNoBanco.stream()
                .map(m -> new MidiaDTO(
                    m.getId(),
                    m.getNome(),
                    m.getUrl(),
                    m.getDuracaoSegundos(),
                    m.getDataUpload()
                ))
                .toList();
    }

    public void deletarVideo(Long id) {
        Midia midia = midiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada com ID: " + id));
        midiaRepository.delete(midia);
    }

    public long contarMidias() {
        return midiaRepository.count();
    }

    public void editarMidia(Long id, MidiaDTO midiaDTO) {
        Midia midia = midiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada com ID: " + id));
        
        // 🎯 CORREÇÃO EXATA PARA RECORD: Records usam .nome() e .duracaoSegundos() sem o prefixo "get"
        midia.setNome(midiaDTO.nome());
        midia.setDuracaoSegundos(midiaDTO.duracaoSegundos());
        midiaRepository.save(midia);
    }
}