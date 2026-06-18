/* eslint-disable import/no-extraneous-dependencies */
const wpPlugin = require('@wordpress/eslint-plugin');
const globals = require('globals');
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
	{
		// Jest globals for unit tests.
		files: ['**/*.test.js'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
];
