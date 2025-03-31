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

# Iniciar o servidor em um terminal separado
echo -e "${BLUE}Iniciando o servidor Node.js...${NC}"
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'\" && node server.js"'

# Verificar se o script foi executado corretamente
if [ $? -ne 0 ]; then
  echo -e "${RED}Erro ao iniciar o servidor. Tente manualmente com: node server.js${NC}"
else
  echo -e "${GREEN}Servidor iniciado em http://localhost:3000${NC}"
fi

# Iniciar o cliente de desenvolvimento
echo -e "${BLUE}Iniciando o servidor de desenvolvimento do React...${NC}"
npm run dev 