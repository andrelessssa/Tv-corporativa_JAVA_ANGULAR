package br.gov.al.arsal.tv_corporativa_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_midia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Midia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String tipo;
    @Column(nullable = false)
    private String url;
    private Integer duracaoSegundos;




}
