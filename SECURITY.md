# Security

This project follows a security-first approach to test automation. This document outlines the security practices and policies in place.

## No Secrets in the Repository

The repository contains no credentials, API keys, authentication tokens, or real personal data. All test data (users, products, orders) uses generated, disposable identifiers with timestamps to prevent collisions on shared test instances. Test fixtures are cleaned up automatically after each test run using the `afterEach` hook, which calls the ServeRest API's own `DELETE` endpoints to remove test data.

## Dependency & Artifact Management

The `.gitignore` file explicitly excludes:

- Assignment documentation and AI-tooling configuration files
- `.env` files (with `.env.example` as the sole exception, though currently none exist since this project requires no secret environment variables)
- Local third-party source clones kept only for reference

This ensures that accidentally committed credentials, temporary build artifacts, or reference clones cannot leak.

## Test Configuration Security

The Cypress configuration (`cypress.config.js`) sets `allowCypressEnv: false`, disabling the deprecated `Cypress.env()` API (which would otherwise expose all environment variables to browser-context code) and enforcing Cypress's modern `Cypress.expose()` / `cy.env()` pattern instead.

## Dependency Vulnerability Management

Automated security scanning via `npm audit --audit-level=critical` runs on every push and pull request to `dev`, `staging`, and `main` branches. The build gates on **critical-severity findings only**, ensuring that genuinely severe vulnerabilities block deployment.

A known **high-severity vulnerability** (RCE/DoS in `serialize-javascript`) exists within mochawesome's transitive dependency tree (an HTML test-report generator), along with related moderate/low findings. These packages only process locally-generated test results, never untrusted external input, so practical exploitability is negligible. The remediation path (`npm audit fix --force`) would require downgrading mochawesome by 6 major versions, introducing a worse tradeoff than the current risk profile. Full reasoning is documented in `TEST-STRATEGY.md` (Section 7).

## No Application Attack Surface

This project is a test-automation suite only; it does not ship application code. The systems under test (ServeRest's API and frontend) are third-party services. The only attack surface is the test suite itself and its CI/CD pipeline.

## Reporting Security Issues

If you discover a security issue, please open a GitHub issue on this repository describing your concern.
