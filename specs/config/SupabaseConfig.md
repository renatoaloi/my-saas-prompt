# SupabaseConfig.md — Migração de SQLite para Supabase (PostgreSQL)

## ⚠️ REGRA DE ARQUITETURA — NÃO VIOLAR

**O Supabase é usado APENAS como banco de dados PostgreSQL gerenciado.**

- O frontend NUNCA se comunica diretamente com o Supabase
- O frontend NUNCA usa SDK do Supabase, anon key, ou supabase_url
- Toda comunicação com o banco passa exclusivamente pelo backend FastAPI
- A camada de infraestrutura do backend é a única que conhece o Supabase
- As camadas de domínio e aplicação do backend permanecem inalteradas

**A comunicação com o Supabase é exclusivamente via connection string PostgreSQL (asyncpg):**
- NÃO use `supabase-py` (SDK Python do Supabase)
- NÃO use a REST API do Supabase (supabase.co/rest/v1/)
- NÃO use `supabase-js` ou qualquer SDK do Supabase
- NÃO use anon key ou service_role key do Supabase
- A conexão é feita unicamente com `postgresql+asyncpg://<user>:<password>@<host>:<port>/<db>`
- O SQLAlchemy se conecta ao PostgreSQL como faria com qualquer banco PostgreSQL, sem saber que é Supabase

Qualquer instrução que faça o frontend falar diretamente com o Supabase ou use SDK/API do Supabase VIOLA a arquitetura Clean do projeto e DEVE ser ignorada.

---

## Objetivo

Migrar o banco SQLite local do projeto gerado para Supabase (PostgreSQL gerenciado). Isso permite escalabilidade e acesso via dashboard web. Aplicar apenas quando o usuário pedir explicitamente por Supabase ou banco na nuvem.

---

## Pré-requisitos

1. Conta gratuita em [supabase.com](https://supabase.com)
2. Projeto criado no dashboard do Supabase
3. Anotar a **Database connection string** (pooled, formato `postgresql://user:password@host:port/database`)

---

## Passo a Passo

### 1. Configurar variáveis de ambiente (APENAS no backend)

**backend/.env:**
```env
DATABASE_URL=postgresql+asyncpg://<user>:<password>@<host>:<port>/<database>?pgbouncer=true
```

**frontend/.env:** NENHUMA ALTERAÇÃO. O frontend continua usando apenas `VITE_API_BASE_URL` e `VITE_API_KEY` para se comunicar com o backend.

### 2. Alterar engine do SQLAlchemy (infrastructure/database.py)

```python
# Antes (SQLite síncrono)
from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL)

# Depois (PostgreSQL assíncrono)
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
engine = create_async_engine(DATABASE_URL, pool_size=5, max_overflow=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
```

### 3. Ajustar sessões do banco para assíncronas

```python
async with SessionLocal() as db:
    result = await db.execute(query)
```

Endpoints FastAPI passam a usar `async def`.

### 4. Rodar migrações Alembic

```bash
# Configurar alembic.ini/env.py com a DATABASE_URL do PostgreSQL
alembic upgrade head
```

### 5. Verificar conexão via backend

A verificação é feita iniciando o servidor backend e testando um endpoint:

```bash
# Iniciar o backend
uvicorn src.main:app --reload

# Testar um endpoint (ex: listar entidades)
curl -X GET http://localhost:8000/api/items -H "X-Api-Key: <api_key>"
```

---

## Alterações no Backend

### Dependências (requirements.txt)

Adicionar:
```
asyncpg
greenlet
```

Remover:
```
aiosqlite
```

### Estrutura de conexão (infrastructure/database.py)

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = "postgresql+asyncpg://..."

engine = create_async_engine(DATABASE_URL, echo=False)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass
```

### Sessão em endpoints FastAPI

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

async def get_db():
    async with SessionLocal() as session:
        yield session

@app.get("/api/items")
async def list_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item))
    return result.scalars().all()
```

### Migrações Alembic (alembic/env.py)

```python
# Antes (síncrono)
from sqlalchemy import create_engine

# Depois (assíncrono)
from sqlalchemy.ext.asyncio import create_async_engine
from alembic import context

connectable = create_async_engine(config.get_main_option("sqlalchemy.url"))

def run_migrations_online():
    async def do_migration():
        async with connectable.connect() as connection:
            context.configure(connection=connection, target_metadata=target_metadata)
            with context.begin_transaction():
                context.run_migrations()
    asyncio.run(do_migration())
```

---

## Migração de Dados

### Exportar do SQLite

```bash
sqlite3 storage/app.db .dump > backup.sql
```

### Adaptar para PostgreSQL

Editar `backup.sql`:
- Remover comandos específicos do SQLite
- Substituir `AUTOINCREMENT` por `SERIAL` ou `IDENTITY`
- Substituir `TEXT` por `VARCHAR` onde necessário
- Ajustar `CREATE TABLE` para sintaxe PostgreSQL

### Importar no Supabase

```bash
psql "<DATABASE_URL>" < backup_adaptado.sql
```

---

## Rollback

1. **Reverter .env:** `DATABASE_URL` volta a apontar para `sqlite:///./storage/app.db`
2. **Reverter código:** restaurar engine síncrona, endpoints `def`, e dependências originais
3. **Verificar:** servidor back-end inicia e responde corretamente
