import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block deprecations.
 *
 * Each entry's `save` must match — verbatim — markup that a previous plugin
 * version wrote to post content, so existing blocks migrate instead of
 * tripping "this block contains unexpected content". Ordered oldest first.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
 */

// v1.0.0 — before custom icons (no iconUrl/iconSize) and before the
// accessibility pass (no modal <h2> title; close button labelled by labelText).
const preCustomIcon = {
	attributes: {
		blockId: { type: 'string', default: '' },
		placeholderText: { type: 'string', default: 'Search...' },
		buttonText: { type: 'string', default: 'Search' },
		labelText: { type: 'string', default: 'Search for:' },
		showLabel: { type: 'boolean', default: false },
	},
	migrate(attributes) {
		return {
			...attributes,
			iconUrl: '',
			iconSize: '1.5rem',
		};
	},
	save({ attributes }) {
		const { blockId, placeholderText, buttonText, labelText, showLabel } =
			attributes;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<button
					className="wp-block-ph-search-modal__button"
					data-micromodal-trigger={blockId}
					aria-label={labelText}
				>
					<Icon icon={search} />
				</button>

				<div
					className="modal wp-block-ph-search-modal__fade"
					id={blockId}
					aria-hidden="true"
				>
					<div
						className="wp-block-ph-search-modal__overlay"
						tabIndex="-1"
						data-micromodal-close
					>
						<div
							className="wp-block-ph-search-modal__container"
							role="dialog"
							aria-modal="true"
							aria-labelledby={`${blockId}-title`}
						>
							<header className="wp-block-ph-search-modal__header">
								<button
									className="wp-block-ph-search-modal__close-button"
									aria-label={labelText}
									data-micromodal-close
								></button>
							</header>
							<main
								className="wp-block-ph-search-modal__content"
								id={`${blockId}-content`}
							>
								<form
									method="GET"
									className="wp-block-ph-search-modal__form wp-block-search"
									action="/"
								>
									<label
										className={
											showLabel
												? ''
												: 'screen-reader-text'
										}
										htmlFor={`${blockId}-input`}
									>
										{labelText}
									</label>
									<div className="wp-block-ph-search-modal__form-controls">
										<input
											id={`${blockId}-input`}
											type="text"
											name="s"
											className="wp-block-ph-search-modal__form-input wp-block-search__input"
											placeholder={placeholderText}
											required
										/>
										<div className="wp-block-button">
											<button
												type="submit"
												className="wp-block-ph-search-modal__form-button wp-block-button__link"
												style={{ cursor: 'pointer' }}
											>
												{buttonText}
											</button>
										</div>
									</div>
								</form>
							</main>
						</div>
					</div>
				</div>
			</div>
		);
	},
};

// v1.1.0 — custom icons added (iconUrl/iconSize), but still before the
// accessibility pass: no modal <h2> title; close button labelled by labelText.
const preAccessibleHeader = {
	attributes: {
		blockId: { type: 'string', default: '' },
		placeholderText: { type: 'string', default: 'Search...' },
		buttonText: { type: 'string', default: 'Search' },
		labelText: { type: 'string', default: 'Search for:' },
		showLabel: { type: 'boolean', default: false },
		iconUrl: { type: 'string', default: '' },
		iconSize: { type: 'string', default: '1.5rem' },
	},
	save({ attributes }) {
		const {
			blockId,
			placeholderText,
			buttonText,
			labelText,
			showLabel,
			iconUrl,
			iconSize,
		} = attributes;
		const blockProps = useBlockProps.save();

		const iconStyle = {
			width: iconSize,
			height: iconSize,
		};

		return (
			<div {...blockProps}>
				<button
					className="wp-block-ph-search-modal__button"
					data-micromodal-trigger={blockId}
					aria-label={labelText}
				>
					{iconUrl ? (
						<img
							src={iconUrl}
							alt={labelText}
							className="wp-block-ph-search-modal__custom-icon"
							style={iconStyle}
						/>
					) : (
						<Icon icon={search} style={iconStyle} />
					)}
				</button>

				<div
					className="modal wp-block-ph-search-modal__fade"
					id={blockId}
					aria-hidden="true"
				>
					<div
						className="wp-block-ph-search-modal__overlay"
						tabIndex="-1"
						data-micromodal-close
					>
						<div
							className="wp-block-ph-search-modal__container"
							role="dialog"
							aria-modal="true"
							aria-labelledby={`${blockId}-title`}
						>
							<header className="wp-block-ph-search-modal__header">
								<button
									className="wp-block-ph-search-modal__close-button"
									aria-label={labelText}
									data-micromodal-close
								></button>
							</header>
							<main
								className="wp-block-ph-search-modal__content"
								id={`${blockId}-content`}
							>
								<form
									method="GET"
									className="wp-block-ph-search-modal__form wp-block-search"
									action="/"
								>
									<label
										className={
											showLabel
												? ''
												: 'screen-reader-text'
										}
										htmlFor={`${blockId}-input`}
									>
										{labelText}
									</label>
									<div className="wp-block-ph-search-modal__form-controls">
										<input
											id={`${blockId}-input`}
											type="text"
											name="s"
											className="wp-block-ph-search-modal__form-input wp-block-search__input"
											placeholder={placeholderText}
											required
										/>
										<div className="wp-block-button">
											<button
												type="submit"
												className="wp-block-ph-search-modal__form-button wp-block-button__link"
												style={{ cursor: 'pointer' }}
											>
												{buttonText}
											</button>
										</div>
									</div>
								</form>
							</main>
						</div>
					</div>
				</div>
			</div>
		);
	},
};

// v1.2.0 — accessibility pass (modal <h2> title; close button labelled
// "Close search modal"), but search input is type="text" (before the
// type="search" change).
const preSearchInputType = {
	attributes: {
		blockId: { type: 'string', default: '' },
		placeholderText: { type: 'string', default: 'Search...' },
		buttonText: { type: 'string', default: 'Search' },
		labelText: { type: 'string', default: 'Search for:' },
		showLabel: { type: 'boolean', default: false },
		iconUrl: { type: 'string', default: '' },
		iconSize: { type: 'string', default: '1.5rem' },
	},
	save({ attributes }) {
		const {
			blockId,
			placeholderText,
			buttonText,
			labelText,
			showLabel,
			iconUrl,
			iconSize,
		} = attributes;
		const blockProps = useBlockProps.save();

		const iconStyle = {
			width: iconSize,
			height: iconSize,
		};

		return (
			<div {...blockProps}>
				<button
					className="wp-block-ph-search-modal__button"
					data-micromodal-trigger={blockId}
					aria-label={labelText}
				>
					{iconUrl ? (
						<img
							src={iconUrl}
							alt={labelText}
							className="wp-block-ph-search-modal__custom-icon"
							style={iconStyle}
						/>
					) : (
						<Icon icon={search} style={iconStyle} />
					)}
				</button>

				<div
					className="modal wp-block-ph-search-modal__fade"
					id={blockId}
					aria-hidden="true"
				>
					<div
						className="wp-block-ph-search-modal__overlay"
						tabIndex="-1"
						data-micromodal-close
					>
						<div
							className="wp-block-ph-search-modal__container"
							role="dialog"
							aria-modal="true"
							aria-labelledby={`${blockId}-title`}
						>
							<header className="wp-block-ph-search-modal__header">
								<h2
									id={`${blockId}-title`}
									className="screen-reader-text"
								>
									{labelText}
								</h2>
								<button
									className="wp-block-ph-search-modal__close-button"
									aria-label={__(
										'Close search modal',
										'search-modal-block'
									)}
									data-micromodal-close
								></button>
							</header>
							<main
								className="wp-block-ph-search-modal__content"
								id={`${blockId}-content`}
							>
								<form
									method="GET"
									className="wp-block-ph-search-modal__form wp-block-search"
									action="/"
								>
									<label
										className={
											showLabel
												? ''
												: 'screen-reader-text'
										}
										htmlFor={`${blockId}-input`}
									>
										{labelText}
									</label>
									<div className="wp-block-ph-search-modal__form-controls">
										<input
											id={`${blockId}-input`}
											type="text"
											name="s"
											className="wp-block-ph-search-modal__form-input wp-block-search__input"
											placeholder={placeholderText}
											required
										/>
										<div className="wp-block-button">
											<button
												type="submit"
												className="wp-block-ph-search-modal__form-button wp-block-button__link"
												style={{ cursor: 'pointer' }}
											>
												{buttonText}
											</button>
										</div>
									</div>
								</form>
							</main>
						</div>
					</div>
				</div>
			</div>
		);
	},
};

const deprecated = [preCustomIcon, preAccessibleHeader, preSearchInputType];

export default deprecated;
