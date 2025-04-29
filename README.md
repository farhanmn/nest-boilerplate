# Nest JS Boilerplate

## Description

RESTful API using Nest JS with Posgre Boilerplate

## Project setup

```bash
$ yarn install
```

## Database setup
This project using Prisma ORM.

To create or modify column, you can directly modify the schema on ``/prisma/schema.prisma``.
```bash
# pull existing DB to schema
$ npx prisma db pull

# generate migration after modify schema
$ npx prisma migrate dev --name <name_of_change>

# deploy migration to DB
$ npx prisma migrate deploy

# apply new prisma schema after deploy
$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Tech

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
- [Prisma ORM](https://www.prisma.io/) - a next-generation object–relational mapper (ORM) that claims to help developers build faster and make fewer errors
- [Passport](https://passportjs.org/) - Authentication middleware for Node.js
- [JWT](https://jwt.io/) - A compact URL-safe means of representing claims to be transferred between two parties
- [Jest](https://jestjs.io) - A delightful JavaScript Testing Framework with a focus on simplicity
- [ESLint](https://eslint.org/) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
