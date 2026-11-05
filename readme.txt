=== Search Modal Block ===
Contributors:      philhoyt
Tags:              block, search, modal, search form, popup search
Requires at least: 6.1
Tested up to:      7.1
Stable tag:        1.3.1
Requires PHP:      7.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A block that shows a search icon and opens the site search form in a modal dialog when clicked

== Description ==

Search Modal Block adds one block, Search Modal Block, to the inserter. On the page it renders a button with a search icon. Clicking the button opens a modal with a standard WordPress search form that submits to your site's search results.

In the block inspector you can set:

* The placeholder text in the search field.
* The text on the submit button.
* The label text, which is read by screen readers and can also be shown above the field.
* The button icon: the default magnifying glass, or an image from the media library.
* The icon size: S, M, L, XL, or a custom value in px, em, rem, or %.

The modal is a `role="dialog"` with `aria-modal`, a title for assistive technology, and a close button. Opening it moves focus into the dialog and locks page scrolling; Escape and the overlay close it. The form uses the theme's `wp-block-search` and `wp-block-button__link` classes, so it picks up the same styling as the core Search and Buttons blocks.

The front-end script (MicroModal plus the init call, about 3 KB gzipped) loads only on pages that contain the block. The stylesheet is page-scoped on block themes; classic themes load every registered block's styles on every page.

== Installation ==

1. Install from Plugins > Add New by searching for "Search Modal Block", or upload the plugin folder to `/wp-content/plugins/`.
2. Activate the plugin on the Plugins screen.
3. In the editor, add the Search Modal Block to a header, navigation area, or any other content.

== Frequently Asked Questions ==

= How do I style the button and the form? =

The trigger button inherits your theme's button colours. The form reuses the `wp-block-search__input` and `wp-block-button__link` classes, so theme.json styles for the Search and Buttons blocks apply to it. For anything else, target the `wp-block-ph-search-modal__*` classes in your theme's CSS.

= Does it work on a subdirectory or multisite install? =

Yes. The form action is rewritten on render to the site's `home_url()`, so the search goes to the right site.

= Will updating break blocks I added with an older version? =

No. The block carries deprecations for the 1.0.0, 1.1.0, and 1.2.0 markup, so older blocks are migrated when the post is next opened in the editor and keep rendering on the front end until then.

== Screenshots ==

1. The block's settings in the editor.
2. The open search modal on the front end.

== Changelog ==

= 1.3.1 =
* Tested up to WordPress 7.1.

= 1.3.0 =
* Changed the search field to `type="search"` for the native clear control.
* Added block deprecations so blocks added with earlier versions keep working after an update.
* Updated MicroModal to 0.7.0.
* Tested up to WordPress 7.0.

= 1.2.0 =
* Tested up to WordPress 6.9.
* Fixed the form action URL on subdirectory and multisite installations.
* Added a modal title and ARIA labels for the dialog and close button.

= 1.1.0 =
* Added a custom icon option that takes an image from the media library.
* Added icon size controls with S, M, L, and XL presets and a custom size.

= 1.0.1 =
* Added the WordPress.org assets and the `src` directory to the release.

= 1.0.0 =
* Initial release.
* Added placeholder, button text, and label text settings.
* Added focus-visible styles for keyboard users.

== Credits ==

The modal is driven by [MicroModal](https://micromodal.vercel.app/), a small modal library released under the ISC license.
