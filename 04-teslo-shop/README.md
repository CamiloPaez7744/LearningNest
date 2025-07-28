<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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

6. Copy the **`.env.template`** file, rename it to **`.env`**, and update its values with your personal configuration settings.

7. Start the application with the command:

```
$ yarn start:dev
```

8. Populate the database by visiting [http://localhost:3000/api/seed](http://localhost:3000/api/seed) in your browser or using a tool like `curl` or Postman.
