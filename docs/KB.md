# Knowledge Base — Search Modal Block

A per-project lookup table for API constraints, version-specific gotchas, and findings from external docs. Not prose — one line per entry.

Format: `topic — finding — source URL`

## WordPress

- (none yet)

## Block editor

- Block deprecations & icon SVGs — a bare `<Icon icon={search}>` in `save()` inlines the icon's SVG into post content, so a deprecation `save()` only matches if `@wordpress/icons` hasn't changed that SVG. The `search` icon path is identical across `@wordpress/icons` ^10.5.0 (verified V1.0.0 build vs 1.2.0). — https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/

## Third-party libraries

- @wordpress/scripts ≥32 — dropped the `wp-prettier` fork for upstream prettier 3, so the canonical JS style changed: no inner spaces in JSX expression containers/parens (`{ x }` → `{x}`). Run `npm run lint:js -- --fix` after upgrading. — https://www.npmjs.com/package/@wordpress/prettier-config
- ESLint flat config + wp-scripts ≥32 — `import/no-unresolved` is ON for JS files and fails on externalized `@wordpress/*` imports unless those packages are installed; declare imported `@wordpress/*` packages as devDependencies (they're externalized to `wp.*` at build, so no bundle impact). — https://github.com/WordPress/gutenberg/tree/trunk/packages/eslint-plugin

## Local environment

- (none yet)
