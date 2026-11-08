# Development roadmap

RuleHarbor is at the initial scaffolding stage. Everything below is planned and
unchecked. Estimates are provisional development estimates, not completed work,
program approval or a promise of paid hours.

## 1. Rule catalogue (6-8 hours)

- [ ] Define structured fields, operators and validation.
- [ ] Add PostgreSQL migrations and rule entities, repositories, services and APIs.
- [ ] Create, edit, activate and archive rules with optimistic concurrency.
- [ ] Preserve rule revisions and build the rule editor and catalogue UI.
- [ ] Test validation, conflicts and database persistence.

## 2. Requests and evaluation (6-8 hours)

- [ ] Define fictional equipment, access and facilities request examples.
- [ ] Add idempotent request creation and server-generated references.
- [ ] Evaluate structured conditions through Easy Rules, without executable user scripts.
- [ ] Persist immutable matched and unmatched rule snapshots with reasons.
- [ ] Build request submission, filtering and evaluation details.

## 3. Reviews and audit (6-8 hours)

- [ ] Add a human review queue and approve/reject actions with mandatory notes.
- [ ] Prevent stale updates and duplicate terminal decisions.
- [ ] Record auditable changes and expose searchable history.
- [ ] Add end-to-end review tests and accessible error states.

## 4. Access and release hardening (8-12 hours)

- [ ] Implement authentication and reviewer/administrator permissions.
- [ ] Add PostgreSQL integration tests, migrations and backup/restore instructions.
- [ ] Package the API and UI for Docker without exposing local development defaults.
- [ ] Add continuous integration, threat modelling and deployment documentation.
- [ ] Review browser accessibility, responsive layouts and security boundaries.

Total initial estimate: **26-36 hours remaining**, to be refined during development.
This is genuine application work, not a claim that the project has users or an
established contribution history. Any external program decides its own eligibility.
