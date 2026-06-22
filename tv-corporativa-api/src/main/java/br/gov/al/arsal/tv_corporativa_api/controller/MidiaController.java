package br.gov.al.arsal.tv_corporativa_api.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.service.MidiaService;

@RestController
@RequestMapping("api/midias")
@CrossOrigin(origins = "*")
public class MidiaController {

    @Autowired
    private MidiaService midiaService;

    // Injeta o caminho da pasta de mídias (configurado no application.properties)
    @Value("${arsal.upload.diretorio}")
    private String diretorioUpload;

    // 🌟 ROTA CORRIGIDA: Agora mapeia exatamente /api/midias/upload e aceita o arquivo binário
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MidiaDTO> salvar(
            @RequestParam("nome") String nome,
            @RequestParam("duracaoSegundos") Integer duracaoSegundos,
            @RequestParam("arquivo") MultipartFile arquivo) {
        
        // Dispara o serviço para salvar o vídeo físico em C:/arsal_midias/ e registrar no Postgres
        MidiaDTO midiaSalva = midiaService.salvarMidiaComArquivo(nome, duracaoSegundos, arquivo);
        return ResponseEntity.status(201).body(midiaSalva);
    }

    // 🎬 ROTA DE STREAMING: Serve o arquivo de vídeo físico para a TV em tempo real!
    @GetMapping("/stream/{nomeArquivo}")
    public ResponseEntity<Resource> transmitirVideo(@PathVariable String nomeArquivo) {
        try {
            // Localiza o arquivo na pasta física do servidor
            Path caminhoArquivo = Paths.get(diretorioUpload).resolve(nomeArquivo);
            Resource recurso = new UrlResource(caminhoArquivo.toUri());

            if (recurso.exists() || recurso.isReadable()) {
                // Retorna o arquivo com o tipo correto para o navegador dar "Play" no vídeo de forma fluida
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("video/mp4"))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + recurso.getFilename() + "\"")
                        .body(recurso);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MidiaDTO>> listar(){
        List<MidiaDTO> lista = midiaService.listarMidias();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/total")
    public ResponseEntity<Long> contarMidias() {
        long total = midiaService.contarMidias();
        return ResponseEntity.ok(total);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVideo(@PathVariable Long id) {
        midiaService.deletarVideo(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editarMidia(@PathVariable Long id, @RequestBody MidiaDTO midiaDTO) {
        midiaService.editarMidia(id, midiaDTO);
        return ResponseEntity.noContent().build();  
    }
}