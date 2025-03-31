const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração CORS
app.use(cors({
  origin: '*', // Permite requisições de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Configuração do banco de dados
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Rota de healthcheck
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor está funcionando!' });
});

// Rota de healthcheck específica
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Função para formatar data no formato YYYY-MM-DD
const formatarData = (dataString) => {
  if (!dataString) return null;
  
  // Se já estiver no formato YYYY-MM-DD, retorna a string
  if (/^\d{4}-\d{2}-\d{2}$/.test(dataString)) {
    return dataString;
  }
  
  // Se estiver no formato DD/MM/AAAA, converte para YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
    const [dia, mes, ano] = dataString.split('/');
    return `${ano}-${mes}-${dia}`;
  }
  
  // Se não conseguir converter, retorna null
  return null;
};

// Rota para enviar os dados do formulário para o banco de dados
app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;
  
  try {
    // Mapeamento dos campos do formulário para as colunas do banco de dados
    const dadosParaInserir = {
      nome: formData.fullName || `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      cidade_entrevista: formData.preferredInterviewCity || 'São Paulo',
      data_nascimento: formatarData(formData.birthDate),
      cidade_nascimento: formData.birthPlace ? formData.birthPlace.split(',')[0].trim() : null,
      estado_nascimento: formData.birthPlace ? formData.birthPlace.split(',')[1]?.trim() : null,
      data_viagem: formatarData(formData.arrivalDate),
      dias_viagem: formData.stayDuration,
      local_estadia: formData.hotel || formData.contactAddress,
      custo_viagem: formData.travelPayment === 'Outra pessoa' ? 'outra pessoa' : 'eu',
      outros_viajantes: formData.otherTravelers || 'não',
      visitou_eua: formData.previousVisit === 'Sim' ? 'sim' : 'nao',
      visto_emitido: formData.previousVisa === 'Sim' ? 'sim' : 'nao',
      visto_negado: formData.visaDenied === 'Sim' ? 'sim' : 'nao',
      endereco_atual: formData.address,
      bairro: formData.neighborhood || '',
      cep: formData.zipCode,
      cidade: formData.city,
      telefone_celular: formData.primaryPhone,
      rede_social: formData.socialMedia || '',
      numero_passaporte: formData.passportNumber,
      cidade_emissao_passaporte: formData.passportIssuePlace,
      data_emissao: formatarData(formData.passportIssueDate),
      data_vencimento: formatarData(formData.passportExpiryDate),
      cidade_destino_eua: formData.cityToVisit,
      nome_pai: formData.fatherName,
      data_nascimento_pai: formatarData(formData.fatherBirthDate),
      nome_mae: formData.motherName,
      data_nascimento_mae: formatarData(formData.motherBirthDate),
      tem_parente_eua: formData.relativesInUS === 'Sim' ? 'sim' : 'nao',
      estado_civil: formData.maritalStatus || 'Solteiro',
      detalhes_estado_civil: '',
      profissao: formData.currentOccupation,
      empresa_atual: formData.companyName,
      endereco_empresa: formData.companyAddress,
      telefone_empresa: formData.companyPhone,
      data_inicio_trabalho: formatarData(formData.jobStartDate),
      renda_bruta_mensal: formData.monthlyIncome || '',
      descricao_funcoes: formData.jobDescription,
      escola_faculdade: formData.lastSchool,
      endereco_escola_faculdade: formData.schoolAddress,
      curso: formData.course,
      data_inicio_curso: formatarData(formData.courseStartDate),
      data_termino_curso: formatarData(formData.courseEndDate),
      fala_outra_lingua: formData.languages || 'não',
      outros_paises_visitados: formData.countriesVisited || '',
      servico_militar: formData.militaryService || 'nunca',
      ultima_formacao: formData.highestEducation || '',
      sexo: formData.gender || 'M'
    };
    
    // Construir a query dinâmica
    const colunas = Object.keys(dadosParaInserir).filter(key => dadosParaInserir[key] !== undefined);
    const valores = colunas.map(coluna => dadosParaInserir[coluna]);
    const placeholders = colunas.map((_, i) => `$${i + 1}`).join(', ');
    
    const query = `
      INSERT INTO tabela_viagem (${colunas.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    // Executar a query
    const result = await pool.query(query, valores);
    
    res.status(201).json({
      success: true,
      message: 'Dados salvos com sucesso!',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao salvar os dados no banco.',
      error: error.message
    });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Tentar conectar ao banco após o servidor estar rodando
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Erro ao conectar ao banco:', err);
    } else {
      console.log('Conexão com o banco estabelecida com sucesso!');
      release();
    }
  });
}); 