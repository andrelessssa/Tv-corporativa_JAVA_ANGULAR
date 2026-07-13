package br.gov.al.arsal.tv_corporativa_api.service;

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

// 🪣 Importações do MinIO
import io.minio.MinioClient;
import io.minio.PutObjectArgs;

@Service
public class MidiaService {

    @Autowired
    private MidiaRepository midiaRepository;

    @Autowired
    private MinioClient minioClient;

    @Value("${MINIO_BUCKET:tv-midias}")
    private String nomeBucket;

    public MidiaDTO salvarMidiaComArquivo(String nome, Integer duracao, MultipartFile arquivo) {
        try {
            String nomeOriginal = arquivo.getOriginalFilename();
            String nomeUnico = UUID.randomUUID().toString() + "_" + nomeOriginal;

            // 🚀 Envia o stream direto para o balde do MinIO
            try (java.io.InputStream is = arquivo.getInputStream()) {
                minioClient.putObject(
                    PutObjectArgs.builder()
                        .bucket(nomeBucket)
                        .object(nomeUnico)
                        .stream(is, arquivo.getSize(), -1)
                        .contentType(arquivo.getContentType())
                        .build()
                );
            }

            // 🎯 O link do streaming agora aponta para a porta do MinIO
            String urlDoVideo = "http://192.168.1.148:9001/" + nomeBucket + "/" + nomeUnico;

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
            throw new RuntimeException("Erro catastrófico ao realizar upload para o MinIO: " + e.getMessage());
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

        // 🎯 CORREÇÃO EXATA PARA RECORD: Records usam .nome() e .duracaoSegundos() sem
        // o prefixo "get"
        midia.setNome(midiaDTO.nome());
        midia.setDuracaoSegundos(midiaDTO.duracaoSegundos());
        midiaRepository.save(midia);
    }
}