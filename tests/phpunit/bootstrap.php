<?php
/**
 * PHPUnit bootstrap file.
 *
 * Loads the WordPress test suite environment when running integration tests.
 * For unit tests (tests/phpunit/unit/), Brain Monkey mocks are used instead.
 *
 * @package Search_Modal_Block
 */

declare(strict_types=1);

$wp_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $wp_tests_dir ) {
	$wp_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $wp_tests_dir . '/includes/functions.php' ) ) {
	// Unit test suite — no WordPress bootstrap needed.
	// Brain Monkey handles WordPress function mocks in unit tests.
	return;
}

// Required by the WP Core test bootstrap — points to the installed polyfills library.
define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname( __DIR__, 2 ) . '/vendor/yoast/phpunit-polyfills' );

require_once $wp_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 *
 * @return void
 */
function _manually_load_plugin(): void {
	$plugin_file = glob( dirname( __DIR__, 2 ) . '/*.php' )[0] ?? '';
	if ( $plugin_file ) {
		require $plugin_file;
	}
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require $wp_tests_dir . '/includes/bootstrap.php';
