# Unified Workspace

A Turborepo monorepo that collects small Node.js demo apps in `apps/`. Most were produced by the project-factory generator and are intentionally minimal: each has an `index.js`, a `features.json` and a `daily-enhancer.js` that appends a line to `enhancement_log.txt`. Treat them as scaffolds and experiments rather than production software.

## Contents

| Path | What it is |
| --- | --- |
| `apps/project-factory/` | The generator (`scripts/project-generator.js`) that creates new app folders and their READMEs |
| `apps/<name>-<timestamp>/` | Generated demo apps (stock predictor, trading bot, vulnerability scanner, ...) |
| `.github/workflows/` | Scheduled workflows that run the generator and the per-app enhancer |
| `render.yaml`, `vercel.json`, `docker-compose.yml`, `deploy_all.ps1` | Deployment configuration |

## Commands

```bash
npm install
npm run build     # turbo run build
npm run lint
npm run format    # prettier
```

Run one app: `cd apps/<name> && npm start`.

## Automation

Two workflows can commit to this repository, and both are manual-only (**Actions -> Run workflow**); their schedules were removed:

- **Enhance All Projects Daily** runs one app's `enhance` script and commits the result.
- **Project Factory** generates a new app.

The "enhancements" append log lines and feature entries; they do not change app behaviour. The very large commit history comes from when these ran every few minutes.
