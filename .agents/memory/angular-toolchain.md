---
name: Angular toolchain constraints
description: Replit runtime and package-firewall considerations for Angular CLI upgrades.
---

Choose an Angular CLI major whose Node.js engine range includes the active workspace runtime. Angular build dependencies can also pin older Piscina releases that the package firewall rejects; updating that transitive dependency to the latest compatible same-major release is preferable to bypassing the firewall.

**Why:** The workspace runtime can lag the newest Angular CLI patch requirements, and blocked transitive tarballs prevent the preview from installing or starting.

**How to apply:** Before upgrading Angular, compare `node -v` with `pnpm view @angular/cli@latest engines`. If install is blocked on Piscina, identify its parent package and resolve to a current compatible release before restarting the app.