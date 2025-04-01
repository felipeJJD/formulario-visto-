# Formulário Destino Visto

Este é um formulário web para coleta de informações de solicitantes de visto americano, baseado no site [Destino Vistos](https://destinovistos.com.br/formulario/).

## Tecnologias Utilizadas

- **Frontend**: React, Material-UI, React Hook Form
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **Ferramentas de Build**: Vite

## Como Executar Localmente

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Para iniciar o servidor backend com o frontend:
```bash
npm start
```

4. Acesse o formulário no navegador:
```
http://localhost:3000
```

## Deploy no Railway

Este projeto está configurado para deploy no Railway. Para fazer o deploy:

1. Crie uma conta no [Railway](https://railway.app/)
2. Crie um novo projeto e conecte ao repositório GitHub
3. Configure as variáveis de ambiente necessárias:
   - `NODE_ENV` = production
   - `PORT` = 3000
   - `DB_HOST` = seu-host-db
   - `DB_PORT` = sua-porta-db
   - `DB_NAME` = seu-nome-db
   - `DB_USER` = seu-usuario-db
   - `DB_PASSWORD` = sua-senha-db
4. Configure o Build Command como: `npm run build`
5. Configure o Start Command como: `npm start`

## Estrutura do Projeto

- `src/` - Código fonte do frontend React
- `public/` - Arquivos estáticos
- `server.js` - Servidor Express que serve o frontend e APIs
- `vite.config.js` - Configuração do Vite para build

## Funcionalidades

- Formulário de múltiplas etapas (wizard)
- Validação de campos
- Interface responsiva
- Envio de dados para banco de dados PostgreSQL
- Campos organizados por categorias:
  - Informações Pessoais
  - Documentação
  - Viagem
  - Contatos
  - Família
  - Ocupação