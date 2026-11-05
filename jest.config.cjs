/**
 * Jest configuration.
 *
 * `@wordpress/scripts` 36 moved test-unit-js to Vitest and stopped shipping
 * Jest defaults. This keeps the existing Jest suite on the published
 * WordPress preset, per the scripts package's vitest-migration guide
 * ("Keep an existing Jest suite"). The only project override lets Jest
 * transform the ESM-only `uuid` that ships inside @wordpress/blocks.
 */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	transform: {
		'\\.[jt]sx?$': [
			'babel-jest',
			{ presets: ['@wordpress/babel-preset-default'] },
		],
	},
	// uuid (ESM-only) ships nested inside @wordpress/blocks; allow Jest to
	// transform it at any depth while leaving the rest of node_modules ignored.
	transformIgnorePatterns: ['node_modules/(?!(?:[^/]+/)*(?:uuid|marked)/)'],
};
