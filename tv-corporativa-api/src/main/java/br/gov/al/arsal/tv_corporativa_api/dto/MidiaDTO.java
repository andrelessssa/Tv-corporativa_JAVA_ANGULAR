package br.gov.al.arsal.tv_corporativa_api.dto;

import java.time.LocalDateTime;

import br.gov.al.arsal.tv_corporativa_api.model.Midia;

public record MidiaDTO(Long id, String nome,  String url, Integer duracaoSegundos, LocalDateTime dataUpload) {

    public MidiaDTO(Midia midia) {
        this(midia.getId(), midia.getNome(),  midia.getUrl(), midia.getDuracaoSegundos(), midia.getDataUpload());
    }


}
