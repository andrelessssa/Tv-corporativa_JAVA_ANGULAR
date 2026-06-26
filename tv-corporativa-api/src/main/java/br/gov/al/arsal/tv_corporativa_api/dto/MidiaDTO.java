package br.gov.al.arsal.tv_corporativa_api.dto;

import java.time.LocalDateTime;



public record MidiaDTO(Long id, String nome, String url, Integer duracaoSegundos, LocalDateTime dataUpload) {
    
    public MidiaDTO(Long id, String nome, String url, Integer duracaoSegundos, LocalDateTime dataUpload) {
    this.id = id;
    this.nome = nome;
    this.url = url;
    this.duracaoSegundos = duracaoSegundos;
    this.dataUpload = dataUpload;
}

}
