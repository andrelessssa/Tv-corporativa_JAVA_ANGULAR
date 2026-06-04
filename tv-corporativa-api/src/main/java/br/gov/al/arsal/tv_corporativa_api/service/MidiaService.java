package br.gov.al.arsal.tv_corporativa_api.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.gov.al.arsal.tv_corporativa_api.dto.MidiaDTO;
import br.gov.al.arsal.tv_corporativa_api.model.Midia;
import br.gov.al.arsal.tv_corporativa_api.repository.MidiaRepository;

@Service
public class MidiaService {

    @Autowired
    private MidiaRepository midiaRepository;

    public MidiaDTO salvarMidia(MidiaDTO midiaDTO) {
        Midia midia = new Midia();
        BeanUtils.copyProperties(midiaDTO, midia);

        return new MidiaDTO(midiaRepository.save(midia));
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
