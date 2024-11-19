<?php
/**
 * Plugin Name:       Search Modal Block
 * Plugin URI:        https://github.com/philhoyt/search-modal-block
 * Description:       Responsive search modal block.
 * Requires at least: 6.1
 * Requires PHP:      7.3
 * Version:           1.0.0
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
 * @since 1.0.0
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * @return void
 */
function search_modal_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\\search_modal_block_init' );
