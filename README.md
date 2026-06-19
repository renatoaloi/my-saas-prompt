# my-saas-prompt

Gere um SaaS completo com backend, frontend e Docker em minutos — apenas preenchendo um formulário.

![Capa do Projeto](assets/capa.png)
*Imagem de capa — adicionar posteriormente*

![Preview do Formulário](assets/form-preview.png)
*Print do formulário de especificação*

---

## Como Usar

### 1. Preencha o formulário

Abra o arquivo `specs/SpecsForm.html` no seu navegador e preencha:

| Campo | O que colocar |
|---|---|
| **Nome do Projeto** | Título do seu SaaS |
| **Objetivo / Descrição** | O que o sistema deve fazer |
| **Regras de Negócio** | Regras que o sistema deve respeitar |
| **Entidades** | Tabelas do banco com seus campos |
| **Requisitos Funcionais** | Validações e comportamentos esperados |
| **Requisitos Visuais** | Opções do menu lateral e tema visual |

### 2. Gere o arquivo de especificação

Clique em **Gerar .md** — o arquivo `Project.md` será baixado automaticamente.

### 3. Construa o projeto com IA

Abra seu harness de IA favorito (Claude, Codex, Cursor, OpenCode etc.) e peça para executar o arquivo `specs/Prompt.txt`. A IA vai:

1. Ler o `Project.md`
2. Criar a estrutura completa do projeto
3. Implementar backend com arquitetura Clean
4. Implementar frontend React + Vite + Tailwind
5. Configurar Docker
6. Gerar README.md

> **Ordem recomendada:** primeiro gere a aplicação básica. Depois, se desejar, adicione autenticação JWT ou migre para Supabase — são configurações opcionais.

### 4. Execute com Docker

```bash
docker compose up -d --build
```

Acesse `http://localhost:8080` e veja seu sistema pronto!

---

## Configurações Avançadas (Opcionais)

Após gerar a aplicação básica, você pode aplicar configurações extras:

- **Autenticação JWT** (`specs/config/LoginConfig.md`): adiciona cadastro, login e reset de senha
- **Migração para Supabase** (`specs/config/SupabaseConfig.md`): troca SQLite por PostgreSQL gerenciado

---

## Vídeo

[Assista ao tutorial no YouTube](https://youtu.be/iX3zGKaQoks)

---

## Dependências

- **Git** — controle de versão
- **Docker** — containerização da aplicação
- **Node.js** — para gerar as tech specs (`node build-specs.js`)
