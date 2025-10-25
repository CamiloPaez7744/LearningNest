# NestJS Learning Repository - AI Coding Agent Instructions

> **Note**: For general development best practices, coding standards, and design patterns, see [AGENTS.md](AGENTS.md)

## Project Overview
This is a **progressive learning repository** with 5 independent NestJS projects showcasing different architectural patterns and technologies. Each project (`01-TypeScript-intro`, `02-car-dealership`, `03-pokedex`, `04-teslo-shop`, `05-ws-client`) is self-contained with its own dependencies and can be run independently.

## Architecture Patterns

### Project Structure Convention
All NestJS projects follow this modular structure:
```
src/
  app.module.ts          # Root module with imports
  main.ts                # Bootstrap file
  [feature]/             # Feature modules (cars, pokemon, products, etc.)
    [feature].module.ts
    [feature].controller.ts
    [feature].service.ts
    entities/
    dto/
  common/                # Shared utilities
  seed/                  # Database seeding (GET /api/seed)
```

### Database Architecture by Project
- **02-car-dealership**: In-memory storage (no database)
- **03-pokedex**: MongoDB with Mongoose (`@nestjs/mongoose`, `@Schema()`, `@Prop()`)
- **04-teslo-shop**: PostgreSQL with TypeORM (`@nestjs/typeorm`, `@Entity()`, `@Column()`)

### Key Patterns

#### 1. Configuration Management (03-pokedex, 04-teslo-shop)
**03-pokedex** uses factory pattern + Joi validation:
```typescript
// config/app.config.ts - Export factory function
export const AppConfiguration = () => ({ port: process.env.PORT || 4000, ... });

// config/joi.validation.ts - Schema validation
export const JoiValidationSchema = Joi.object({ PORT: Joi.number().default(3004) });

// app.module.ts
ConfigModule.forRoot({ load: [AppConfiguration], validationSchema: JoiValidationSchema })
```

**04-teslo-shop** uses direct `.env` with `ConfigModule.forRoot()`.

#### 2. Entity Lifecycle Hooks
Use `@BeforeInsert()` and `@BeforeUpdate()` for data normalization:
```typescript
// 04-teslo-shop/src/products/entities/product.entity.ts
@BeforeInsert()
checkSlug() {
  if (!this.slug) this.slug = this.title.toLowerCase().replaceAll(/ /g, '_');
}
```

#### 3. Custom Decorators for Auth (04-teslo-shop)
Composite decorator pattern combining guards:
```typescript
// auth/decorators/auth.decorator.ts
export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}
// Usage: @Auth(ValidRoles.admin)
```

#### 4. Common Module Pattern
Reusable utilities in `common/`:
- **DTOs**: `PaginationDto` with `class-validator` decorators (`@IsOptional()`, `@IsPositive()`)
- **Pipes**: `ParseMongoIdPipe` for MongoDB ID validation
- **Adapters**: `AxiosAdapter` implementing `HttpAdapter` interface for dependency injection

#### 5. Seed Pattern
All projects expose `GET /api/seed` endpoint for database population:
```typescript
// seed/seed.controller.ts
@Get()
executeSeed() { return this.seedService.executeSeed(); }
```

## Development Workflows

### Standard Commands (per project directory)
```bash
yarn install                # Install dependencies
yarn start:dev              # Development with watch mode
yarn start:prod             # Production mode
yarn test                   # Unit tests
yarn test:e2e               # E2E tests
```

### Database Setup (03-pokedex, 04-teslo-shop)
1. Start Docker container: `docker-compose up -d`
2. Copy `.env.template` to `.env` and configure
3. Start app: `yarn start:dev`
4. Seed database: Visit `http://localhost:3000/api/seed`

### Production Docker (03-pokedex)
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Technology-Specific Conventions

### Mongoose (03-pokedex)
- Entities extend `Document` from mongoose
- Use `@Schema()` and `@Prop()` decorators
- Create schemas: `SchemaFactory.createForClass(Entity)`
- Custom pipes for validation: `ParseMongoIdPipe` with `isValidObjectId()`

### TypeORM (04-teslo-shop)
- Use `@Entity()` with table name parameter
- Relations: `@OneToMany()`, `@ManyToOne()` with cascade and eager options
- Array columns: `@Column('text', { array: true })`
- Password fields: `@Column('text', { select: false })`

### WebSockets (04-teslo-shop + 05-ws-client)
- Gateway: `@WebSocketGateway({ cors: true })`
- Implement `OnGatewayConnection`, `OnGatewayDisconnect`
- JWT authentication in `handleConnection` via `client.handshake.headers['token']`
- Emit patterns: `client.emit()` (single), `client.broadcast.emit()` (all except sender), `wss.emit()` (all)

### Authentication & Authorization (04-teslo-shop)
- JWT strategy with `@nestjs/passport` and `passport-jwt`
- Password hashing with `bcrypt`
- Custom `@Auth()` decorator combines authentication + role-based guards
- User decorator: `@GetUser()` extracts user from request

### API Documentation (04-teslo-shop)
- Swagger integration with `@nestjs/swagger`
- Entity documentation: `@ApiProperty()` with description and example

## Testing Conventions
- Unit tests: `*.spec.ts` files co-located with source
- E2E tests: `test/app.e2e-spec.ts`
- Jest configuration in `package.json`

## Critical Details
- **Global validation pipe**: Set up in `main.ts` with `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))`
- **TypeORM synchronize**: Set to `true` in development (NEVER in production)
- **Static file serving**: Use `ServeStaticModule.forRoot()` for serving HTML/CSS
- **Port defaults**: Projects typically run on 3000 (except 03-pokedex defaults to 4000)

## When Adding Features
1. Generate resources: `nest g resource [name]` (creates module, controller, service, DTOs)
2. Register module in `app.module.ts` imports
3. Add DTOs with `class-validator` decorators
4. Create entities following DB-specific patterns (Mongoose vs TypeORM)
5. Update seed data if applicable
