# 🏗️ Passo 1: Baixa o Node.js para compilar o projeto Angular em arquivos de produção
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# 🏃 Passo 2: Pega os arquivos prontos e joga para dentro do servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tv-corporativa-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]