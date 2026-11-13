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

Two workflows commit to this repository on a schedule:

- **Enhance All Projects Daily** runs an app's `enhance` script on a timer and commits the result.
- **Project Factory** generates a new app every three days.

These commits are produced by scripts, which is why the history is very large. The "enhancements" append log lines and feature entries; they do not change app behaviour. Disable the schedules in `.github/workflows/` if you do not want that.
