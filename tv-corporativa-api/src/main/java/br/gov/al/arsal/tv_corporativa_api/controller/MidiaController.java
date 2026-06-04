package br.gov.al.arsal.tv_corporativa_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.service.MidiaService;

@RestController
@RequestMapping("api/midias")

@CrossOrigin(origins = "*")
public class MidiaController {

    @Autowired
    private MidiaService midiaService;

    @PostMapping
    public ResponseEntity<MidiaDTO> salvar(@RequestBody MidiaDTO midiaDTO) {
        MidiaDTO midiaSalva = midiaService.salvarMidia(midiaDTO);
        return ResponseEntity.status(201).body(midiaSalva);
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


