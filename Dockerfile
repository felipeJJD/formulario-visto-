# Etapa de build: usar uma imagem oficial do Node.js
FROM node:18-alpine AS build

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Criar diretório de trabalho
WORKDIR /app

# Copiar apenas package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar o restante dos arquivos
COPY . .

# Construir o projeto
RUN npm run build

# Etapa de execução: imagem mais leve
FROM node:18-alpine

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Criar diretório de trabalho
WORKDIR /app

# Copiar apenas package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar apenas dependências de produção (não de desenvolvimento)
RUN npm ci --only=production

# Copiar arquivos de build da etapa anterior
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]