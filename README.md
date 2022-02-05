## Description

Boilerplate.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Running docker-compose
```bash
# Running docker-compose dependencies
$ docker-compose up -d
```

To verify database is up access `http://localhost:8080/`
Inform this data:

Sistema: PostgreSQL
Servidor: pgsql
Usuário: pguser
Senha: pgpassword

## Add new resource
```bash
# add new CRUD
$ nest g resource <resource_name>
```

## Stay in touch

- Author - [Alex de Paula](mailto://alexdepaula@outlook.com)

## License

Nest is [MIT licensed](LICENSE).
