# RuleHarbor

An early-stage deterministic rules and operational request-review application,
intended for teams that need configurable checks, exception reviews and an audit
history. Built with Java 21, Spring Boot, PostgreSQL and React / TypeScript.

## Current status

**Initial scaffold, not a completed application.** The repository currently has:

- A Spring Boot API with database configuration, health checks and CSRF protection.
- A React workspace shell that checks the API connection.
- Local PostgreSQL setup and automated scaffold tests.
- Apache-2.0 licensing and a [development roadmap](ROADMAP.md).

Rule CRUD, request evaluation, exception reviews, audit persistence and user
authentication are **not implemented yet**. Easy Rules is included as the planned
deterministic rule engine; no rule evaluation is wired up in this scaffold.
There is no ML training, model serving or AI inference in this project.
Development examples will use fictional operational requests, not real customer,
personal or financial records. There are no claimed users or production deployments.

This is an independent project, not a copy of another application's code or history.

## Local setup

Prerequisites: Java 21, Node.js 22.12+ (or a supported newer LTS), npm and Docker
Compose. The Maven wrapper downloads Maven on first use.

From the repository root:

```sh
node scripts/setup.mjs
docker compose up -d --wait postgres
set -a
. ./.env
set +a
export DATABASE_URL="jdbc:postgresql://127.0.0.1:${DB_PORT}/${POSTGRES_DB}"
./mvnw -pl server spring-boot:run
```

The setup script generates a random local database password in an ignored `.env`
file and preserves an existing file. Never commit that file or its contents.

In a second terminal, from the repository root:

```sh
npm --prefix apps/web ci
npm --prefix apps/web run dev
```

- Workspace shell: http://127.0.0.1:5190
- API health: http://127.0.0.1:8190/actuator/health
- API documentation: http://127.0.0.1:8190/swagger-ui/index.html

The UI proxy uses API port 8190 by default. To change ports, set `API_PORT` for the
Java process, set `VITE_API_TARGET` to its URL for the UI process, and pass Vite
`--port` for a different web port. Swagger currently documents only scaffold
endpoints, not the planned business APIs.

**Local development only:** no login or role enforcement exists yet. The API, UI
and database bind to loopback by default. Do not expose them publicly or load
sensitive data. CSRF protection is not a replacement for authentication.

Stop the database with `docker compose stop postgres`; this preserves its data.

## Verification

```sh
./mvnw clean verify
npm --prefix apps/web ci
npm --prefix apps/web test
npm --prefix apps/web run build
```

Backend tests use an isolated H2 database; they are scaffold checks, not evidence
of PostgreSQL migration or business workflow correctness. Browser checks:

```sh
cd apps/web
npx playwright install chromium
npm run test:e2e
```

## Structure

```text
server/       Java API, configuration and scaffold tests
apps/web/     React workspace shell and tests
scripts/      Local environment setup
compose.yaml  Local PostgreSQL only
ROADMAP.md    Planned work, not completed features
```

Future business domains will use `entity`, `enums`, `repository`, `dto`, `service`
and `controller` layers. Evaluations are intended to retain immutable rule
snapshots; consequential decisions will remain human-controlled.

## Contributing

Discuss a roadmap item in an issue before making a substantial change. Keep
changes focused, include tests, preserve real commit history and use fictional
sample data only. Do not submit secrets or employer/client-owned material.

## License

[Apache License 2.0](LICENSE).
