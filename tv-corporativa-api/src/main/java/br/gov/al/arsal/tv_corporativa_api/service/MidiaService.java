package br.gov.al.arsal.tv_corporativa_api.service;

import java.nio.file.Files;
import java.nio.file.Path; // 🌟 IMPORT CORRIGIDO: java.nio.file.Path no lugar do jakarta
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value; // 🌟 Import necessário para ler o properties
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.model.Midia;
import br.gov.al.arsal.tv_corporativa_api.repository.MidiaRepository;

@Service
public class MidiaService {

    @Autowired
    private MidiaRepository midiaRepository;

    // 🌟 VARIÁVEL ADICIONADA: Busca o caminho 'C:/arsal_midias/' configurado no application.properties
    @Value("${arsal.upload.diretorio}")
    private String diretorioUpload;

    public MidiaDTO salvarMidiaComArquivo(String nome, Integer duracao, MultipartFile arquivo) {
        try {
            // 1. Cria a pasta física no servidor se ela não existir
            Path pasta = Paths.get(diretorioUpload);
            if (!Files.exists(pasta)) {
                Files.createDirectories(pasta);
            }

            // 2. Gera um nome único para o arquivo não sobrescrever outro
            String nomeOriginal = arquivo.getOriginalFilename();
            String nomeUnico = UUID.randomUUID().toString() + "_" + nomeOriginal;
            
            // 3. Copia o arquivo recebido para dentro da pasta do servidor
            Path caminhoCompleto = pasta.resolve(nomeUnico);
            Files.copy(arquivo.getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);

            // 4. Monta a URL de streaming (Aponta para o próprio servidor Java)
            String urlDoVideo = "http://localhost:8080/api/midias/stream/" + nomeUnico;

            // 5. Salva as informações textuais no banco Postgres
            Midia midia = new Midia();
            midia.setNome(nome);
            midia.setDuracaoSegundos(duracao);
            midia.setUrl(urlDoVideo);

            return new MidiaDTO(midiaRepository.save(midia));

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar o arquivo de vídeo no servidor: " + e.getMessage());
        }
    }

    public List<MidiaDTO> listarMidias() {
        List<Midia> midiasNoBanco = midiaRepository.findAll();
        return midiasNoBanco.stream()
                .map(m -> new MidiaDTO(m))
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
        BeanUtils.copyProperties(midiaDTO, midia);
        midiaRepository.save(midia);
    }
}