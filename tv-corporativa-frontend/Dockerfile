# Etapa 1 - Build do Angular
FROM node:20 AS build
WORKDIR /app
COPY . .
WORKDIR /app/tv-corporativa-frontend
RUN npm install
RUN npm run build

# Etapa 2 - Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/tv-corporativa-frontend/dist/tv-corporativa-frontend/browser/ /usr/share/nginx/html/
COPY ./tv-corporativa-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]