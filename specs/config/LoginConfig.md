# LoginConfig.md — Autenticação JWT

## Objetivo

Este documento especifica como adicionar autenticação JWT ao projeto gerado. Deve ser executado APÓS a construção inicial do projeto, como uma camada opcional de segurança. Mas apenas quando o usuário pedir para adicionar Login ou Autenticação no projeto, não executar antes disso.

---

## Backend

### Modelo User

Adicionar entidade `User` no banco:

| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID (PK) | Identificador único |
| email | String (unique) | Email do usuário |
| password_hash | String | Hash bcrypt da senha |
| nome | String | Nome do usuário |
| ativo | Boolean | Se o usuário está ativo |
| created_at | DateTime | Data de criação |
| updated_at | DateTime | Data de atualização |

### Rota POST /auth/register

- Recebe `nome`, `email` e `password` no body (JSON)
- Valida se email já está cadastrado — retorna 409 se duplicado
- Gera hash da senha com bcrypt
- Cria usuário no banco
- Retorna `{ id, nome, email }` (201 Created)

### Rota POST /auth/token

- Recebe `email` e `password` no body (JSON)
- Valida credenciais contra o banco usando bcrypt
- Retorna `{ access_token, token_type: "bearer" }`
- Token JWT contém: `sub` (user id), `email`, `exp`, `iat`

### Rota PUT /auth/password (autenticada)

- Requer token JWT no header `Authorization: Bearer <token>`
- Recebe `nova_senha` e `confirmar_senha` no body (JSON)
- Valida se `nova_senha === confirmar_senha` — retorna 400 se diferente
- Gera novo hash bcrypt e atualiza no banco
- **Não exige senha atual** — o usuário logado pode redefinir diretamente
- Retorna `{ mensagem: "Senha alterada com sucesso" }`

### Middleware de Autenticação

- Decorator/injeção `get_current_user` que:
  1. Extrai token do header `Authorization: Bearer <token>`
  2. Decodifica e valida JWT
  3. Busca usuário no banco pelo `sub`
  4. Retorna o objeto User ou levanta 401
- Todas as rotas existentes (CRUDs) devem usar este middleware

### Variáveis de Ambiente (Backend)

| Variável | Descrição | Padrão |
|---|---|---|
| JWT_SECRET | Chave secreta para assinar tokens | (obrigatório) |
| JWT_ALGORITHM | Algoritmo de assinatura | HS256 |
| JWT_EXPIRY | Tempo de expiração do token | 3600 (1 hora) |

### Dependências adicionais

Adicionar ao `requirements.txt`:
- `pyjwt`
- `bcrypt`

---

## Frontend

### Página de Cadastro (`/register`)

- Formulário com campos: nome, email, senha, botão "Cadastrar"
- Ao cadastrar, redireciona para `/login` com mensagem de sucesso
- Se email já existir, exibe erro em Modal

### Página de Login (`/login`)

- Formulário com campos: email, senha, botão "Entrar"
- Link para `/register` para novos usuários
- Loading state durante a requisição
- Exibe erro em Modal (sem `alert()`)
- Redireciona para `/dashboard` após sucesso

### AuthContext

- Provider React que armazena token e dados do usuário
- `login(email, password)` → chama API, armazena token em `localStorage`
- `logout()` → limpa token, redireciona para `/login`
- `user` → dados do usuário logado (`{ id, nome, email }`)
- `isAuthenticated` → boolean
- `updatePassword(novaSenha, confirmarSenha)` → chama PUT /auth/password

### Diálogo de Resetar Senha

- Acessível de dentro do sistema (ex: menu do usuário → "Alterar senha")
- Modal com campos: nova senha, confirmar nova senha, botão "Salvar"
- Valida se os dois campos são iguais antes de enviar
- Não solicita senha atual
- Após sucesso, exibe toast/modal de confirmação e fecha o diálogo

### PrivateRoute

- Wrapper de rota que verifica `isAuthenticated`
- Se não autenticado, redireciona para `/login`
- Se autenticado, renderiza o componente filho

### Requisições Autenticadas

O serviço de API (`api.ts` ou similar) deve:
- Incluir header `Authorization: Bearer <token>` em todas as requisições
- Se receber 401, chamar `logout()` automaticamente

### Variável de Ambiente (Frontend)

| Variável | Descrição | Padrão |
|---|---|---|
| VITE_API_AUTH_URL | URL base da API para auth | mesma VITE_API_BASE_URL |

---

## Instruções para IA

1. **Backend:**
   - Criar modelo User e migração Alembic
   - Implementar rota POST /auth/register (nome, email, senha)
   - Implementar rota POST /auth/token (login)
   - Implementar rota PUT /auth/password (resetar senha, autenticada)
   - Implementar middleware get_current_user
   - Proteger rotas existentes com o middleware

2. **Frontend:**
   - Criar página de Cadastro (/register)
   - Criar página de Login (/login) com link para cadastro
   - Criar AuthContext com Provider (login, logout, updatePassword)
   - Criar Modal de Alterar Senha (apenas nova senha + confirmar)
   - Criar componente PrivateRoute
   - Adicionar header de autorização nos serviços de API
   - Envolver rotas protegidas com PrivateRoute
