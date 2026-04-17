# 🚀 Alfa+ — Plataforma de Alfabetização Lúdica com Monitoramento de Progresso

📌 Sobre o projeto

O Alfa+ é uma aplicação web voltada para a alfabetização de adultos e idosos de forma lúdica e acessível.
A plataforma combina atividades interativas com acompanhamento de desempenho, promovendo aprendizado contínuo e inclusivo.

Este projeto foi desenvolvido com foco em:

Experiência do usuário (UX) simplificada
Acessibilidade (voz e feedback tátil)
Coleta e análise de dados de aprendizado
🎯 Problema que resolve

A alfabetização de adultos enfrenta desafios como:

baixa retenção de conteúdo
métodos pouco engajadores
falta de acompanhamento individualizado

O Alfa+ resolve isso ao:

gamificar o aprendizado
registrar progresso por usuário
permitir análise de desempenho por atividade
🧠 Funcionalidades principais
🔐 Autenticação de usuários
👤 Perfis (aluno/instrutor)
📊 Registro de progresso por atividade
🎮 Atividades interativas (jogos e lições)
🔊 Leitura em voz (acessibilidade)
📳 Feedback por vibração (mobile)
🏗️ Arquitetura do projeto

Frontend:

HTML, CSS, JavaScript

Backend (BaaS):

Supabase
Autenticação
Banco de dados
API automática

Estrutura:

/Alfa+
 ├── index.html
 ├── login.html
 ├── perfil.html
 ├── jogo.html
 ├── licao.html
 ├── instrutor.html
 ├── supabase.js
 ├── schema.sql
 └── README.md
⚙️ Como executar o projeto
1. Clone o repositório
git clone https://github.com/seu-usuario/alfa-mais.git
2. Configure o Supabase

Acesse seu projeto no Supabase e copie:

Project URL
anon public key

No arquivo supabase.js, substitua:

const SUPABASE_URL  = 'SUA_URL_AQUI';
const SUPABASE_ANON = 'SUA_CHAVE_AQUI';
3. Execute localmente

Opção simples:

Abra o arquivo index.html no navegador

Opção recomendada:

Usar Live Server no VS Code
🗄️ Modelo de dados

O projeto utiliza tabelas como:

perfis → tipo de usuário
progresso → desempenho por módulo/lição

Exemplo de métricas:

acertos
total de questões
percentual de desempenho
📊 Potencial para Data Science

Este projeto permite evoluções como:

Análise de desempenho por usuário
Identificação de dificuldades por conteúdo
Modelos de recomendação de atividades
Dashboards de acompanhamento educacional
🚀 Diferenciais técnicos
Integração direta com backend (BaaS)
Estrutura modular e escalável
Foco em acessibilidade
Coleta estruturada de dados educacionais
📌 Melhorias futuras
Dashboard analítico (Power BI / Python)
Sistema de recomendação de exercícios
Deploy online (Vercel / Netlify)
Testes automatizados
👩‍💻 Autora

Camille Porto

📎 Observação

Este projeto faz parte do desenvolvimento de portfólio com foco em transição para a área de dados, unindo tecnologia, educação e análise de informações.
