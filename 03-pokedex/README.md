<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This is a pokedex to learn more about NestJs.

## Project setup

1. Clone repository.
2. Navigate to the project directory.
3. Run the following command to install project dependencies:

```bash
$ yarn install
```

4. Make sure you have the NestJS CLI installed globally:

```bash
$ npm i -g @nestjs/cli
```

5. Configure the database using Docker Compose. Run the following command to start the database container in detached mode:

```bash
$ docker-compose up -d
```
6. Copy the __`.env.template`__ file, rename it to __`.env`__, and update its values with your personal configuration settings.

7. Start the application with the command:
```
$ yarn start:dev
```
   
8. Populate the database by visiting [http://localhost:3000/api/seed](http://localhost:3000/api/seed) in your browser or using a tool like `curl` or Postman.

## Build Production

1. Create a file named __`.env.prod`__ and configure it with your values.
2. Build and start the Docker image using the following command:
  ```bash
  $ docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
  ```
```

## Stack

- **NestJS**: Progressive Node.js framework for building efficient server-side applications.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **PostgreSQL**: Relational database used for persistent storage.
- **TypeORM**: ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **Docker**: Containerization platform for database and environment setup.
- **Yarn**: Package manager for dependency management.
- **Jest**: Testing framework for unit and e2e tests.

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
