package br.gov.al.arsal.tv_corporativa_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/midias")
@CrossOrigin(origins = "*")
public class MidiaController {

    @Autowired
    private MidiaService midiaService;

    // 🌟 ROTA DE UPLOAD: Recebe o arquivo e delega o upload direto para o MinIO
    // Client
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MidiaDTO> salvar(
            @RequestParam("nome") String nome,
            @RequestParam("duracaoSegundos") Integer duracaoSegundos,
            @RequestParam("arquivo") MultipartFile arquivo) {

        MidiaDTO midiaSalva = midiaService.salvarMidiaComArquivo(nome, duracaoSegundos, arquivo);
        return ResponseEntity.status(201).body(midiaSalva);
    }

    @GetMapping
    public ResponseEntity<List<MidiaDTO>> listar() {
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