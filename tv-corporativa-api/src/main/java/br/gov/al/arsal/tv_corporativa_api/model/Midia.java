package br.gov.al.arsal.tv_corporativa_api.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_midia")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
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

    @LastModifiedDate // 🌟 Atualiza automaticamente tanto no POST quanto no PUT
    @Column(nullable = false) // Destrancado (sem o updatable=false) para aceitar edições
    private LocalDateTime dataUpload;

    // Construtor padrão exigido pelo JPA
    public Midia() {}

    @PrePersist
    protected void onCreate() {
        this.dataUpload = LocalDateTime.now();
    }


}
