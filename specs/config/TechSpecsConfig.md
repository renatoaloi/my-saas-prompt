# Requisitos Técnicos

## Geral

- Usuário único, não precisa de login (API deve apenas receber uma X API Key para chamadas do frontend)
- Frontend em React + Vite usando Tailwind e responsivo
- Backend em Python + FastAPI + SQLAlchemy + Alembic
- Banco de dados SQLite local na pasta storage
- Upload de arquivos na pasta storage, dentro de subpastas por id da entidade de origem.
- Todos Ids de entidades devem ser UUID's.
- Utilizar migrações do Alembic para criar o banco e para alterações estruturais nas entidades (usando sempre a API do Alembic)
- Não utilizar alert() nem confirm() para comunicação com o usuário no frontend, ao invés disso, usar componentes Modal com design compatível com o site
- Nunca escreva/modifique na pasta storage, pois é onde ficam os dados sensíveis de usuário
- **Arquitetura de comunicação**: o frontend se comunica EXCLUSIVAMENTE com o backend via REST API. O frontend NUNCA se conecta diretamente a bancos de dados, serviços externos, SDKs de terceiros (Supabase, Firebase, etc.) ou qualquer outra coisa que não seja o backend do projeto. Toda regra de negócio, acesso a banco, autenticação e integração externa passa pelo backend.

## Frontend

- Página inicial é o dashboard
- Menu lateral com opções listadas nos requisitos visuais
- Responsivo
- Tema visual conforme detalhado nos requisitos visuais
- Campo para editar markdown no preenchimento de descrição, com opções de negrito, títulos, elementos etc
- Os campos markdown devem ser exibidos formatados, mas editados no texto puro.
- Datas e horas no formato brasileiro respeitando fuso horário do Brasil
- Números e valores monetários exibir no padrão brasileiro no frontend
- Utilizar variáveis de ambiente do Vite, tanto para baseUrl quanto para a chave de API

## Backend

- Arquitetura Clean, com isolamento de camada de aplicação, domínio e infraestrutura
- Injeção de dependência de serviço no controller
- Injeção de dependência do banco no serviço
- Testes unitários das entidades e validação de campos
- Testes de duplicidade de registros (exemplo: não pode duplicar clientes)
- Autenticação por X-Api-Key no header
- Upload de documentos na pasta storage
- Banco de dados na pasta storage
- Utilizar variáveis de ambiente para a chave API, database URL, porta e storage path.
- Lembrar de configurar o CORS permissivo para acesso do frontend.