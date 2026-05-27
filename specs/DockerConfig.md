# Configuração do Docker no Projeto

Depois que o projeto estiver pronto, criar a estrutura necessária para rodar o projeto usando Docker.

## Detalhes técnicos

- Criar arquivos Dockerfile para o frontend e o backend
- Criar arquivo Docker compose para facilitar a orquestração dos containers
- Adicionar instruções de execução usando Docker no README.md do projeto
- Criar volume storage para uso do backend compartilhado com o sistema host (bind mount) [ usar a pasta storage do projeto como ponto de montagem ]
- Usar Docker compose para subir o ambiente
- Verificar saúde da API antes de levantar o container do frontend
- Não esqueça de instalar o wget na imagem do backend para funcionar a verificação de saúde da API
- Não utilizar porta 80 para o backend, deixar o frontend em uma porta alta tipo 8080.
