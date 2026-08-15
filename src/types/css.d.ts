// Next ships ambient declarations for `*.module.css` (node_modules/next/types/global.d.ts)
// but none for plain stylesheets. TypeScript skips side-effect imports by default,
// so `import "./globals.css"` normally type-checks anyway - until something turns on
// `noUncheckedSideEffectImports`, which some editors' TS servers do, and the import
// starts reporting TS2307.
// Wildcard resolution prefers the longest match, so `*.module.css` still wins for
// CSS modules and keeps its typed `classes` default export.
declare module "*.css";
