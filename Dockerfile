# Usar uma imagem oficial do Node.js
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Construir o projeto
RUN npm run build

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"] 