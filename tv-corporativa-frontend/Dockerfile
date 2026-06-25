# 🏃 Passo Único: Servidor Nginx para entrega das telas da ARSAL
FROM nginx:alpine

# 📦 VITÓRIA: Agora pegando os arquivos de dentro da pasta correta que o Angular gerou!
COPY ./tv-corporativa-frontend/dist/tv-corporativa-frontend/browser/* /usr/share/nginx/html/

# 🎛️ Copia o arquivo de configuração do Nginx
COPY ./tv-corporativa-frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]