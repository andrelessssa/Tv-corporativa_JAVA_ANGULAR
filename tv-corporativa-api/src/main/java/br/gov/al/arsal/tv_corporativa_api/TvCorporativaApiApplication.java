package br.gov.al.arsal.tv_corporativa_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TvCorporativaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TvCorporativaApiApplication.class, args);
	}

}


