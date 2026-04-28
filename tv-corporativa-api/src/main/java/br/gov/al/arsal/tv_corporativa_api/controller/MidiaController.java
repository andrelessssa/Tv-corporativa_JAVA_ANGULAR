package br.gov.al.arsal.tv_corporativa_api.controller;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.service.MidiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVideo(@PathVariable Long id) {
        midiaService.deletarVideo(id);
        return ResponseEntity.noContent().build();
    }
}


