# RuleHarbor

Independent, deterministic rules and operational workflow application. Do not copy application code, Git history, credentials, or data from other projects.

- Java 21 / Spring Boot API, PostgreSQL and React / TypeScript.
- Keep domains layered: entity, enums, repository, dto, service, controller.
- Use structured conditions and Easy Rules; never execute user-supplied scripts.
- Keep decisions human-controlled and evaluation snapshots immutable.
- Preserve optimistic concurrency, idempotency, and audit history.
- Use fictional demonstration data only. No model training, model serving, personal or financial datasets.
- Keep credentials, generated state and build outputs out of Git.
- Test API changes with Maven verify; test/build the UI and run browser checks for changed workflows.
- This is a loopback-only, single-operator prototype. Do not present it as authenticated or production-ready.
- Do not push, publish or change repository visibility without the user's authorization.
