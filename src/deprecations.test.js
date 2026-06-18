/**
 * Deprecation migration tests.
 *
 * For each historical save() shape, serialize a block the way that version
 * stored it, then parse it under the current registration (current save +
 * deprecated[]). A correctly-matched deprecation yields isValid === true and
 * migrates silently — no editor "Attempt Block Recovery" prompt.
 */
import {
	registerBlockType,
	unregisterBlockType,
	createBlock,
	serialize,
	parse,
} from '@wordpress/blocks';

// useBlockProps only contributes the wrapper className for this static block
// (no block supports beyond html:false), and it is identical across every
// version. Mock it to avoid pulling the whole @wordpress/block-editor module
// graph (and its ESM-only deps) into the jsdom test environment.
jest.mock('@wordpress/block-editor', () => {
	const useBlockProps = () => ({
		className: 'wp-block-ph-search-modal',
	});
	useBlockProps.save = () => ({
		className: 'wp-block-ph-search-modal',
	});
	return { useBlockProps };
});

import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

const baseAttrs = {
	blockId: 'abc123',
	placeholderText: 'Search...',
	buttonText: 'Search',
	labelText: 'Search for:',
	showLabel: false,
};

const iconAttrs = {
	...baseAttrs,
	iconUrl: '',
	iconSize: '1.5rem',
};

/**
 * Serialize a block using a specific historical save function, returning the
 * markup that version would have written to post content.
 *
 * @param {Object} deprecation A deprecated entry ({ attributes, save }).
 * @param {Object} attributes  Attribute values to serialize.
 * @return {string} Serialized block markup.
 */
function storedMarkup(deprecation, attributes) {
	registerBlockType(name, {
		...metadata,
		attributes: deprecation.attributes,
		save: deprecation.save,
	});
	const markup = serialize(createBlock(name, attributes));
	unregisterBlockType(name);
	return markup;
}

describe('ph/search-modal deprecations', () => {
	afterEach(() => {
		try {
			unregisterBlockType(name);
		} catch {
			// not registered
		}
	});

	it.each([
		['v1.0.0 (no custom icon, no modal title)', deprecated[0], baseAttrs],
		['v1.1.0 (custom icon, no modal title)', deprecated[1], iconAttrs],
		['v1.2.0 (type="text" search input)', deprecated[2], iconAttrs],
	])('migrates %s without a validation error', (_label, dep, attrs) => {
		const markup = storedMarkup(dep, attrs);

		registerBlockType(name, { ...metadata, save, deprecated });
		const [block] = parse(markup);

		expect(block?.name).toBe(name);
		expect(block?.isValid).toBe(true);
		// A matched deprecation regenerates the block and logs an info notice;
		// acknowledge it so @wordpress/jest-console doesn't fail the test.
		expect(console).toHaveInformed();
	});
});
