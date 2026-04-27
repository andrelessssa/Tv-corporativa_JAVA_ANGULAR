package br.gov.al.arsal.tv_corporativa_api.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.Setter;

@Entity
@Table(name = "tb_midia")
@Getter
@Setter

@AllArgsConstructor
public class Midia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String url;
    private Integer duracaoSegundos;

    private LocalDateTime dataUpload;

    public Midia() {}

    @PrePersist
    protected void onCreate() {
        this.dataUpload = LocalDateTime.now();
    }


}
