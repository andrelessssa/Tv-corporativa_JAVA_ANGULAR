# TV Corporativa ARSAL

Sistema web full stack que exibe conteúdo nas TVs corporativas da ARSAL (Agência Reguladora de Serviços Públicos do Estado de Alagoas), em produção em 2 TVs da agência.

## Stack
- **Backend:** Java, Spring Boot (API REST)
- **Frontend:** Angular
- **Banco de dados:** PostgreSQL
- **Infra:** Docker e Docker Compose

## Funcionalidades
- Player de vídeo para exibição nas TVs
- Controle de memória RAM e watchdog no frontend, para operação contínua
- Armazenamento local dos arquivos

## Como rodar
```bash
git clone https://github.com/andrelessssa/Tv-corporativa_JAVA_ANGULAR.git
cd Tv-corporativa_JAVA_ANGULAR
# crie localmente o arquivo de configuração com as credenciais do banco (não versionado)
docker compose up -d --build
```
Acesse em `http://IP-DA-MAQUINA`.

## Configuração
Senhas e arquivos de configuração não ficam no repositório (ver `.gitignore`). Crie-os localmente antes de subir o projeto.

## Estrutura
- `tv-corporativa-api`: API em Spring Boot
- `tv-corporativa-frontend`: aplicação Angular

## Autor
André Lessa — www.linkedin.com/in/andré-lessaa
