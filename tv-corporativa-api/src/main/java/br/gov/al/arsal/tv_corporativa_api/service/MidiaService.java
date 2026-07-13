package br.gov.al.arsal.tv_corporativa_api.service;

import java.io.File; // 📁 IMPORTAÇÃO CORRIGIDA!
import java.nio.file.Files; // 📁 IMPORTAÇÃO CORRIGIDA!
import java.nio.file.Path; // 📁 IMPORTAÇÃO CORRIGIDA!
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
    
    private final String PASTA_UPLOADS = "/app/uploads"; // Pasta dentro do contêiner Linux

    public MidiaDTO salvarMidiaComArquivo(String nome, Integer duracao, MultipartFile arquivo) {
        try {
            String nomeOriginal = arquivo.getOriginalFilename();
            String nomeUnico = UUID.randomUUID().toString() + "_" + nomeOriginal;

            // 📁 Garante que a pasta de uploads exista no disco
            File diretorio = new File(PASTA_UPLOADS);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }

            // 🚀 Salva o arquivo fisicamente no disco do servidor
            Path caminhoDestino = Paths.get(PASTA_UPLOADS).resolve(nomeUnico);
            try (java.io.InputStream is = arquivo.getInputStream()) {
                Files.copy(is, caminhoDestino, StandardCopyOption.REPLACE_EXISTING);
            }

            // 🎯 O link agora vai apontar direto para a própria API na porta 8080!
            String urlDoVideo = "http://192.168.1.148:8080/uploads/" + nomeUnico;

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
        midiaRepository.delete(midia);
    }

    public long contarMidias() {
        return midiaRepository.count();
    }

    public void editarMidia(Long id, MidiaDTO midiaDTO) {
        Midia midia = midiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mídia não encontrada com ID: " + id));

        // 🎯 Usando os métodos nativos do Record
        midia.setNome(midiaDTO.nome());
        midia.setDuracaoSegundos(midiaDTO.duracaoSegundos());
        midiaRepository.save(midia);
    }
}