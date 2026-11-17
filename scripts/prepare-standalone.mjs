import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const webDir = path.join(repoRoot, "apps", "web");
const nextDir = path.join(webDir, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const nestedWebDir = path.join(standaloneDir, "apps", "web");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDereferencedPackage(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) return;
  let resolved;
  try {
    resolved = fs.realpathSync(srcPath);
  } catch {
    return;
  }
  ensureDir(path.dirname(destPath));
  fs.cpSync(resolved, destPath, {
    recursive: true,
    dereference: true,
    force: true,
  });
}

function collectFromNodeModules(nmDir, targetDir) {
  if (!fs.existsSync(nmDir)) return;
  for (const entry of fs.readdirSync(nmDir, { withFileTypes: true })) {
    if (entry.name === ".pnpm" || entry.name === ".bin" || entry.name.startsWith(".")) {
      continue;
    }
    const entryPath = path.join(nmDir, entry.name);
    if (entry.name.startsWith("@")) {
      let resolvedScope = entryPath;
      try {
        resolvedScope = fs.realpathSync(entryPath);
      } catch {
        continue;
      }
      if (!fs.statSync(resolvedScope).isDirectory()) continue;
      for (const scoped of fs.readdirSync(resolvedScope, { withFileTypes: true })) {
        if (scoped.name.startsWith(".")) continue;
        copyDereferencedPackage(
          path.join(resolvedScope, scoped.name),
          path.join(targetDir, entry.name, scoped.name),
        );
      }
    } else {
      copyDereferencedPackage(entryPath, path.join(targetDir, entry.name));
    }
  }
}

function main() {
  if (!fs.existsSync(standaloneDir)) {
    throw new Error(`Standalone directory not found at ${standaloneDir}`);
  }

  const tmpNodeModules = path.join(nextDir, ".tmp_standalone_node_modules");
  fs.rmSync(tmpNodeModules, { recursive: true, force: true });
  ensureDir(tmpNodeModules);

  const rootNm = path.join(standaloneDir, "node_modules");
  const pnpmStoreDir = path.join(rootNm, ".pnpm");

  // 1. Extract all packages from pnpm virtual store (.pnpm/*/node_modules and .pnpm/node_modules)
  if (fs.existsSync(pnpmStoreDir)) {
    const hoistedPnpmNm = path.join(pnpmStoreDir, "node_modules");
    collectFromNodeModules(hoistedPnpmNm, tmpNodeModules);

    for (const storeEntry of fs.readdirSync(pnpmStoreDir, { withFileTypes: true })) {
      if (!storeEntry.isDirectory() || storeEntry.name === "node_modules") continue;
      const innerNm = path.join(pnpmStoreDir, storeEntry.name, "node_modules");
      collectFromNodeModules(innerNm, tmpNodeModules);
    }
  }

  // 2. Overlay root standalone node_modules (non-.pnpm)
  collectFromNodeModules(rootNm, tmpNodeModules);

  // 3. Overlay nested apps/web/node_modules so direct app deps (next, react, etc.) take precedence
  const nestedNm = path.join(nestedWebDir, "node_modules");
  collectFromNodeModules(nestedNm, tmpNodeModules);

  // 4. Replace both standalone/node_modules and standalone/apps/web/node_modules with flat dereferenced copies
  fs.rmSync(rootNm, { recursive: true, force: true });
  fs.rmSync(nestedNm, { recursive: true, force: true });

  fs.cpSync(tmpNodeModules, rootNm, { recursive: true, dereference: true, force: true });
  if (fs.existsSync(nestedWebDir)) {
    fs.cpSync(tmpNodeModules, nestedNm, { recursive: true, dereference: true, force: true });
  }
  fs.rmSync(tmpNodeModules, { recursive: true, force: true });

  // 5. Copy .next/static into nested standalone .next/static
  const staticSrc = path.join(nextDir, "static");
  if (fs.existsSync(staticSrc) && fs.existsSync(nestedWebDir)) {
    const nestedStaticDest = path.join(nestedWebDir, ".next", "static");
    ensureDir(path.dirname(nestedStaticDest));
    fs.cpSync(staticSrc, nestedStaticDest, { recursive: true, force: true });
  }

  // 6. Copy public/ into both nestedWebDir/public and standalone/public
  const publicSrc = path.join(webDir, "public");
  if (fs.existsSync(publicSrc)) {
    if (fs.existsSync(nestedWebDir)) {
      fs.cpSync(publicSrc, path.join(nestedWebDir, "public"), { recursive: true, force: true });
    }
    fs.cpSync(publicSrc, path.join(standaloneDir, "public"), { recursive: true, force: true });
  }

  // 7. Mirror nested apps/web runtime entrypoints (server.js, package.json, .next) at standalone root
  //    so platforms deploying standalone/ directly find server.js, .next/, public/, and node_modules/next side-by-side.
  if (fs.existsSync(nestedWebDir)) {
    const nestedServer = path.join(nestedWebDir, "server.js");
    if (fs.existsSync(nestedServer)) {
      fs.copyFileSync(nestedServer, path.join(standaloneDir, "server.js"));
    }
    const nestedPkg = path.join(nestedWebDir, "package.json");
    if (fs.existsSync(nestedPkg)) {
      fs.copyFileSync(nestedPkg, path.join(standaloneDir, "package.json"));
    }
    const nestedDotNext = path.join(nestedWebDir, ".next");
    if (fs.existsSync(nestedDotNext)) {
      fs.cpSync(nestedDotNext, path.join(standaloneDir, ".next"), { recursive: true, force: true });
    }
  }

  const nextPkgAtRoot = path.join(rootNm, "next", "package.json");
  const nextPkgAtNested = path.join(nestedNm, "next", "package.json");
  if (!fs.existsSync(nextPkgAtRoot) || (fs.existsSync(nestedWebDir) && !fs.existsSync(nextPkgAtNested))) {
    throw new Error("Failed to flatten 'next' module into standalone node_modules.");
  }

  console.log("[prepare-standalone] Prepared symlink-free standalone bundle at:", standaloneDir);
}

main();
