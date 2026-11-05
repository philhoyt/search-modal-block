/* eslint-disable import/no-extraneous-dependencies */
const wpPlugin = require('@wordpress/eslint-plugin');
const globals = require('globals');
const jestPlugin = require('eslint-plugin-jest');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = [
	{
		ignores: ['build/**', 'vendor/**', 'node_modules/**'],
	},
	...wpPlugin.configs.recommended,
	{
		// view.js runs in the browser as a plain script.
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	// The unit suite stays on Jest (wp-scripts test-unit-jest); the default
	// test override in @wordpress/eslint-plugin 27+ targets Vitest instead.
	{
		...jestPlugin.configs['flat/recommended'],
		files: ['src/**/*.test.js'],
	},
];
