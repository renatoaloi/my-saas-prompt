# Arquivo de exemplo! Não considerar como parte do projeto!

Copiar abaixo da linha para seu arquivo Project.md e edite com as suas informações, ou deixe as informações de exemplo para ver o projeto que eu criei com esse prompt.

> **Instrução especial para o harness**: IGNORAR TUDO NESSE ARQUIVO, é só exemplo para o usuário personalizar! Considerar apenas o arquivo Project.md como sendo o principal do projeto.

## Copiar tudo abaixo dessa linha para o arquivo Project.md (e altere conforme sua necessidade):

# Projeto Freelancer Manager Board

O objetivo do projeto é criar um sistema de controle de horas trabalhadas em tarefas. Esse controle de horas trabalhadas vai gerar relatórios por mês/cliente afim de servir como memória de cálculo para ser enviado ao contador para emissão de nota fiscal.

## Regras de Negócio

- Cadastro do Cliente conforme dados da Receita Federal (Cartão CNPJ) para emissão de notas fiscais
- Valor por hora deve ficar atrelado ao projeto, não ao cliente, pois cada projeto do mesmo cliente pode ter valor por hora diferentes.
- As tarefas devem ter campos para Projeto, Nome, Descrição e lançamentos de horas (Hora início/Hora Fim), Data de Criação e Status (Nova, Em andamento, Pronta, Fechada)
- Deve ser possível cadastrar mais de um período de horas por tarefa, indicando o dia que as horas estão sendo executadas.
- Para gerar o relatório, o usuário escolhe o cliente e pede o fechamento do mês. Todas as tarefas devem ter suas horas somadas e multiplicadas pelo valor por hora do projeto em que a tarefa está atrelada.
- O relatório de horas deve conter as informações do cliente e a memória de cálculo por projeto.
- O relatório de horas deve conter também informações sobre o cliente para emissão de nota fiscal, além da totalização de horas e valor total a ser pago no mês. Deve incluir também a informação de qual mês o relatório se refere.
- Além do relatório, deve existir um painel dashboard mostrando a quantidade de tarefas por status, total de horas por cliente por mês, melhores clientes e projetos. Além disso adicionar botões ou cards dos últimos projetos trabalhados para acesso fácil pelo dashboard.
- Deve existir um Kanban por cliente/projeto para eu poder ver as tarefas e qual faixa de status as tarefas se encontram.
- Permitir upload de documentos na tarefa, como PDF's e imagens.
- Só eu vou usar o sistema, não precisa de tela de login, pode abrir direto no dashboard

## Entidades

- Cliente: Id, Nome, RazaoSocial, Email, Documento (CNPJ), Endereço, Complemento, Bairro, Cidade, Estado
- Projeto: Id, ClienteId, Titulo, Descrição, Data de criação, Valor por hora
- Tarefa: Id, ProjetoId, Titulo, Descrição, Status, DataCriação
- Apontamento: Id, TarefaId, Data, HoraIni, HoraFim, TotalHoras
- Relatório: Id, ClienteId, ProjetoId, Tarefas, Total de horas por projeto, total de horas geral, valor total do mês

## Requisitos Técnicos

- Usuário único, não precisa de login (API deve apenas receber uma X API Key para chamadas do frontend)
- Frontend em React + Vite usando Tailwind e responsivo
- Backend em Python + FastAPI + SQLAlchemy + Alembic
- Banco de dados SQLite local na pasta storage
- Upload de arquivos na pasta storage, dentro de subpastas por id de cliente, id do projeto e id da task.
- Todos Ids de entidades devem ser UUID's.

## Frontend

- Página inicial é o dashboard
- Menu lateral com opções de voltar para a página inicial, Cadastro de clientes, Cadastro de Projetos, Kanban para gerenciar as tarefas
- Responsivo
- Tema visual azul escuro com elementos em neon verde água e rosa
- Campo para editar markdown no preenchimento de descrição de projetos e tarefas, com opções de negrito, títulos, elementos etc
- Os campos markdown devem ser exibidos formatados, mas editados no texto puro.

## Backend

- Arquitetura Clean, com isolamento de camada de aplicação, domínio e infraestrutura
- Injeção de dependência de serviço no controller
- Injeção de dependência do banco no serviço
- Testes unitários das entidades e validação de campos
- Testes de duplicidade de registros (não pode duplicar clientes)
- Autenticação por X-Api-Key no header
- Upload de documentos na pasta storage
