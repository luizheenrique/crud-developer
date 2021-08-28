# Developers CRUD

## Backend CakePHP + Mysql

## Frontend React

### Instalação

1. Git clone [Composer](https://github.com/luizheenrique/crud-developer).
2. Run `docker-compose up -d`.

### Configuração Backend

Acesse o container php

```bash
docker exec -it app-php bash
```

Instalando dependências

```bash
composer install
```

Configurando permissão logs e tmp

```bash
chown -R www-data:www-data logs/ &&
chown -R www-data:www-data tmp/
```

Configurando variáveis de ambiente

```bash
cp config/.env.example config/.env
```

Criando base de dados

```bash
bin/cake migrations migrate
```

#### API endpoits

`http://localhost:8000/api/developers`

#### API Documentação

[Postman](<https://documenter.getpostman.com/view/17275542/TzzHmDHd>)

### Configuração Frontend

Acesse o container node

```bash
docker exec -it app-nome bash
```

Instalando dependências

```bash
npm install
```

Iniciando node server

```bash
npm start
```

Acessando Frontend
`http://localhost:3000/`
