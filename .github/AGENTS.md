# General Development Best Practices

> **Project-specific conventions**: See [copilot-instructions.md](./copilot-instructions.md) for NestJS Learning Repository patterns

This document contains general development best practices, testing strategies, and design patterns applicable across projects.

## Table of Contents
- [Development Environment](#development-environment)
- [Testing Strategies](#testing-strategies)
- [Design Principles](#design-principles)
- [Design Patterns](#design-patterns)
- [Git Workflow](#git-workflow)
- [Code Review](#code-review)

## Development Environment

### Node.js Best Practices
- Use async/await instead of callbacks for cleaner asynchronous code
- Implement proper error handling with try-catch blocks and error middleware
- Use environment variables for configuration (never hardcode secrets)
- Leverage streams for handling large files or data to avoid memory issues
- Use clustering or PM2 for production deployments to utilize multiple CPU cores
- Implement graceful shutdown to close database connections and finish pending requests
- Use logging libraries (Winston, Pino) instead of console.log
- Monitor event loop lag and memory usage in production
- Keep dependencies updated and audit them regularly with `npm audit` or `pnpm audit`

### TypeScript Best Practices
- Enable strict mode in tsconfig.json (`"strict": true`)
- Define explicit return types for functions to catch errors early
- Use interfaces for object shapes and types for unions/primitives
- Leverage utility types (Partial, Pick, Omit, Record) to avoid repetition
- Avoid `any` type; use `unknown` when type is truly unknown and narrow it down
- Use discriminated unions for handling different response types
- Use path aliases in tsconfig to avoid relative import hell
- Never use `@ts-ignore`; use `@ts-expect-error` with explanation if needed

## Testing Strategies

### Running Tests
- Run `npm test` (or `pnpm test` / `yarn test`) to run all tests
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report
- `npm test -- -t "<test name>"` - Run specific test by name
- Fix any test or type errors until the whole suite is green
- Add or update tests for the code you change, even if nobody asked

### Testing Best Practices
- Write unit tests for pure functions and business logic
- Write integration tests for API endpoints and database interactions
- Mock external dependencies in unit tests using `jest.mock()`
- Test error scenarios and edge cases, not just happy paths
- Keep test coverage above 80% for critical business logic
- Use descriptive test names: `it('should return 404 when user is not found', ...)`
- Use `beforeEach`/`afterEach` for proper test isolation

## Design Principles

Apply these principles in order of priority:

### 1. Correctness & Security (Highest Priority)
- Code must work correctly and be secure
- Never sacrifice correctness for performance or elegance
- Validate inputs, sanitize outputs, handle edge cases
- No hardcoded secrets, proper authentication/authorization

### 2. Readability & Maintainability
Code is read 10x more than written. Prioritize clarity over cleverness.

**Clear Naming:**
```typescript
// ✅ Good: Self-documenting
function calculateTotalPriceWithTax(items: CartItem[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return subtotal * (1 + taxRate)
}

// ❌ Bad: Unclear names
function calc(i: any[], r: number): number {
  const s = i.reduce((a, b) => a + b.p * b.q, 0)
  return s * (1 + r)
}
```

### 3. Early Return Pattern
Reduce nesting, improve readability.

```typescript
// ✅ Good: Early returns
function processUser(user: User | null): string {
  if (!user) return "User not found"
  if (!user.isActive) return "User is inactive"
  if (!user.email) return "User has no email"
  
  // Main logic here with minimal nesting
  return sendEmail(user.email)
}
```

### 4. DRY (Don't Repeat Yourself)
Eliminate duplication, but don't over-abstract prematurely.

### 5. SOLID Principles

**S - Single Responsibility Principle:**
Each class/function has one reason to change.

**O - Open/Closed Principle:**
Open for extension, closed for modification.

**L - Liskov Substitution Principle:**
Subtypes must be substitutable for their base types.

**I - Interface Segregation Principle:**
Small, focused interfaces over fat interfaces.

**D - Dependency Inversion Principle:**
Depend on abstractions, not concrete implementations.

### 6. Law of Demeter
Only talk to immediate friends, don't reach through objects.

### 7. YAGNI (You Aren't Gonna Need It)
Don't build features you don't need yet.

### 8. KISS (Keep It Simple, Stupid)
Simplicity beats cleverness.

### 9. Composition Over Inheritance
Prefer composition and interfaces over deep inheritance hierarchies.

## Design Patterns

### When to Use Patterns
- **Factory** - Complex object creation logic
- **Builder** - Objects with many optional parameters
- **Singleton** - Need exactly one instance (use with caution)
- **Decorator** - Add behavior dynamically
- **Strategy** - Multiple algorithms for a specific task
- **Observer** - Event system, notify multiple objects
- **Adapter** - Make incompatible interfaces work together

### Anti-patterns to Avoid
- Using patterns when simple code would work
- Factory for trivial object creation
- Singleton for everything (prevents testing)
- Deep decorator chains without clear benefit

## Git Workflow

### Commit Conventions
Follow **Conventional Commits** format: `<type>[scope]: <description>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (no code change)
- `refactor`: Code restructuring (no behavior change)
- `test`: Add/update tests
- `chore`: Dependencies, maintenance

**Examples:**
```bash
feat(auth): add Google login
fix(api): resolve timeout on large requests
docs: update installation instructions
```

### Branching Strategy
```
main/master     → Production code (protected)
  ↓
develop         → Integration branch
  ↓
feature/descriptive-name
hotfix/critical-bug
```

### Daily Workflow
```bash
# 1. Create feature branch
git checkout -b feature/descriptive-name

# 2. Make small, atomic commits
git add -p  # Interactive staging (recommended)
git commit -m "feat(module): add input validation"

# 3. Keep branch updated
git fetch origin
git rebase origin/develop

# 4. Push and create PR
git push origin feature/descriptive-name
```

## Code Review

### For Reviewers
- Check that tests cover the new code
- Verify error handling is implemented properly
- Ensure no hardcoded credentials or sensitive data
- Confirm TypeScript types are properly defined
- Check for potential performance issues
- Verify database queries are optimized
- Ensure proper cleanup of resources
- Look for security vulnerabilities

### Pre-commit Checklist
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Reviewed diff with `git diff`
- [ ] Removed console.logs and debuggers
- [ ] Code follows project conventions
- [ ] Complex changes are documented

## Naming Conventions

### JavaScript/TypeScript
```javascript
// Variables: camelCase
const userName = "Juan"
const isActive = true

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3
const API_BASE_URL = "https://api.example.com"

// Functions: camelCase, verb first
function calculateTotalPrice(items) { }
function getUserById(id) { }

// Classes: PascalCase
class UserService { }
class PaymentProcessor { }

// Files: kebab-case
user-service.js
email-validator.js
```

### API Conventions
```bash
# Endpoints: kebab-case, plural for collections
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}

# Nested resources
GET    /api/users/{id}/orders
```

---

For more detailed patterns, examples, and language-specific best practices, refer to the full `agents-md-best-practices.md` in this directory.
