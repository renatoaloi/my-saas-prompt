# Projeto [ Nome do Projeto ]

O objetivo do projeto é ... [ descrever o que você quer que o projeto faça ]

## Regras de Negócio

- [ preencher com regra 1 ]
- [ preencher com regra 2 ]
- ...
- [ preencher com regra n ]

## Entidades

- [ Entidade 1 ]: campos...
- [ Entidade n ]: campos...

## Requisitos Técnicos

- Usuário único, não precisa de login (API deve apenas receber uma X API Key para chamadas do frontend)
- Frontend em React + Vite usando Tailwind e responsivo
- Backend em Python + FastAPI + SQLAlchemy + Alembic
- Banco de dados SQLite local na pasta storage
- Upload de arquivos na pasta storage, dentro de subpastas por id da entidade de origem.
- Todos Ids de entidades devem ser UUID's.

## Frontend

- Página inicial é o dashboard
- Menu lateral com opções de voltar para a página inicial, [ adicionar aqui funcionalidades que você deseja na aplicação ]
- Responsivo
- Tema visual azul escuro com elementos em neon verde água e rosa [ defina aqui as cores e estilo do site ]
- Campo para editar markdown no preenchimento de descrição, com opções de negrito, títulos, elementos etc
- Os campos markdown devem ser exibidos formatados, mas editados no texto puro.

## Backend

- Arquitetura Clean, com isolamento de camada de aplicação, domínio e infraestrutura
- Injeção de dependência de serviço no controller
- Injeção de dependência do banco no serviço
- Testes unitários das entidades e validação de campos
- Testes de duplicidade de registros (exemplo: não pode duplicar clientes)
- Autenticação por X-Api-Key no header
- Upload de documentos na pasta storage
- Banco de dados na pasta storage
