# Projeto [ Nome do Projeto ]

O objetivo do projeto é ... [ descrever o que você quer que o projeto faça ]

## Regras de Negócio

- [ preencher com regra 1 ]
- [ preencher com regra 2 ]
- ...
- [ preencher com regra n ]

## Entidades

- [ Entidade 1: Id, Campo1, Campo2,... ] 
- [ Entidade 2: Id, Campo3, Entidade1, Campo4... ] 
- [ Entidade n: campos... ]

## Requisitos Funcionais

- [ Campo X deve ter 9 digitos numéricos ]
- [ Exibir campo X formatado no padrão Y ]
- [ Exibir campo Z com um traço (-) separando os últimos 3 dígitos, exemplo: 12345-000 ]
- [ Campo de Y deve verificar se está no formato ISO99 ]
- [ Campos K e L são obrigatórios no cadastro e na edição ]
- [ Não podem existir mais de uma Entidade1 com o mesmo campo X ]

## Requisitos Não Funcionais
- Opções do menu lateral: [ digitar as opções separadas por virgula ]
- Tema visual: [ especificar cores, modos, tipografia, espaçamento etc ]

---
> - **Não precisa editar desse ponto em diante, é apenas para uso da Inteligência Artificial**
>   - Em caso de dúvidas no preenchimento, use o Project.example.md como inspiração.
---

## Requisitos Técnicos

- Usuário único, não precisa de login (API deve apenas receber uma X API Key para chamadas do frontend)
- Frontend em React + Vite usando Tailwind e responsivo
- Backend em Python + FastAPI + SQLAlchemy + Alembic
- Banco de dados SQLite local na pasta storage
- Upload de arquivos na pasta storage, dentro de subpastas por id da entidade de origem.
- Todos Ids de entidades devem ser UUID's.
- Utilizar migrações do Alembic para criar o banco e para alterações estruturais nas entidades (usando sempre a API do Alembic)
- Não utilizar alert() nem confirm() para comunicação com o usuário no frontend, ao invés disso, usar componentes Modal com design compatível com o site
- Nunca escreva/modifique na pasta storage, pois é onde ficam os dados sensíveis de usuário

## Frontend

- Página inicial é o dashboard
- Menu lateral com opções listadas nos requisitos não funcionais
- Responsivo
- Tema visual conforme detalhado nos requisitos não funcionais
- Campo para editar markdown no preenchimento de descrição, com opções de negrito, títulos, elementos etc
- Os campos markdown devem ser exibidos formatados, mas editados no texto puro.
- Datas e horas no formato brasileiro respeitando fuso horário do Brasil
- Números e valores monetários exibir no padrão brasileiro no frontend

## Backend

- Arquitetura Clean, com isolamento de camada de aplicação, domínio e infraestrutura
- Injeção de dependência de serviço no controller
- Injeção de dependência do banco no serviço
- Testes unitários das entidades e validação de campos
- Testes de duplicidade de registros (exemplo: não pode duplicar clientes)
- Autenticação por X-Api-Key no header
- Upload de documentos na pasta storage
- Banco de dados na pasta storage
