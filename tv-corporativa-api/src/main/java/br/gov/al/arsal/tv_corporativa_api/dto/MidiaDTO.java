package br.gov.al.arsal.tv_corporativa_api.dto;

import br.gov.al.arsal.tv_corporativa_api.model.Midia;

public record MidiaDTO(Long id, String nome, String tipo, String url, Integer duracaoSegundos) {

    public MidiaDTO(Midia midia) {
        this(midia.getId(), midia.getNome(), midia.getTipo(), midia.getUrl(), midia.getDuracaoSegundos());
    }

}
