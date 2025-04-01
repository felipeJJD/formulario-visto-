#!/bin/bash

# Cores para mensagens
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Instalando dependências do projeto...${NC}"
npm install

# Verificar se a instalação foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${RED}Erro ao instalar dependências. Verifique os logs acima.${NC}"
  exit 1
fi

echo -e "${GREEN}Dependências instaladas com sucesso!${NC}"

# Iniciar o servidor
echo -e "${BLUE}Iniciando o servidor Node.js...${NC}"
echo -e "${GREEN}Servidor iniciado em http://localhost:3000${NC}"
echo -e "${BLUE}Pressione Ctrl+C para encerrar o servidor${NC}"

# Iniciar o servidor
node server.js

# Iniciar o cliente de desenvolvimento
echo -e "${BLUE}Iniciando o servidor de desenvolvimento do React...${NC}"
npm run dev