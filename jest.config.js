// Extends the @wordpress/scripts unit-test config. The only override allows
// Jest to transform the ESM-only `uuid` that ships inside @wordpress/blocks
// (wp-scripts' default transformIgnorePatterns skips all of node_modules).
const defaultConfig = require('@wordpress/scripts/config/jest-unit.config.js');

module.exports = {
	...defaultConfig,
	// uuid (ESM-only) ships nested inside @wordpress/blocks; allow Jest to
	// transform it at any depth while leaving the rest of node_modules ignored.
	transformIgnorePatterns: ['node_modules/(?!(?:[^/]+/)*uuid/)'],
};
