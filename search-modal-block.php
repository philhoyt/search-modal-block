<?php
/**
 * Plugin Name:       Search Modal Block
 * Plugin URI:        https://github.com/philhoyt/search-modal-block
 * Description:       Responsive search modal block.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.2.0
 * Author:            Phil Hoyt
 * Author URI:        https://philhoyt.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       search-modal-block
 *
 * @package           search-modal-block
 */

namespace SearchModalBlock;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @since 1.0.1
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * @return void
 */
function search_modal_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\\search_modal_block_init' );

/**
 * Filters the rendered block output to replace hardcoded form action URL
 * with the correct WordPress home URL.
 *
 * This ensures the search form works correctly on:
 * - WordPress installations in subdirectories
 * - Multisite installations
 * - Custom permalink structures
 *
 * @since 1.1.0
 *
 * @param string $block_content The block content about to be appended.
 * @param array  $block         The full block, including name and attributes.
 * @return string Modified block content.
 */
function search_modal_block_render( $block_content, $block ) {
	// Only process our block.
	if ( 'ph/search-modal' !== $block['blockName'] ) {
		return $block_content;
	}

	// Replace hardcoded action="/" with the correct home URL.
	$search_url = esc_url( home_url( '/' ) );
	$block_content = str_replace( 'action="/"', 'action="' . $search_url . '"', $block_content );

	return $block_content;
}
add_filter( 'render_block', __NAMESPACE__ . '\\search_modal_block_render', 10, 2 );
