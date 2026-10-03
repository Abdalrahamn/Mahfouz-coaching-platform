# Brand review prompt

Audit the supplied design/output against `../BRAND_SYSTEM.md`, `../AI_BRAND_GUARDRAILS.md`, canonical tokens and relevant `docs/`. Do not redesign it before reporting. Give a separate result for each check:

- **PASS** — aligned and evidenced.
- **WARN** — small inconsistency or incomplete evidence; state practical impact.
- **FAIL** — clear brand, accessibility, privacy, truthfulness or usability violation.

Review palette and semantic roles; typography and RTL/LTR; spacing and geometry; light/dark behavior; contrast/focus/touch/reduced motion; icon consistency; imagery integrity and privacy; transformation fidelity; video/social safe areas; unsupported facts; decorative effects or trendy drift.

For every WARN/FAIL, cite the specific element and give a direct correction. Do not use one numeric score. Do not treat a deliberate owner override as a failure if the override is supplied. If evidence is unavailable, say what could not be checked.

**Material to review:** [paste files, screenshots, links, or description]
