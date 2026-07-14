package br.gov.al.arsal.tv_corporativa_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry; // 📁 IMPORTAÇÃO CORRIGIDA!
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Diz ao Spring para expor os arquivos da pasta /app/uploads na URL /uploads/**
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/app/uploads/");
    }
}