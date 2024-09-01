import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<button
				className="wp-block-ph-search-modal__button"
				data-micromodal-trigger="search-modal"
				aria-label="Open search modal"
			>
				<Icon icon={ search } />
			</button>

			<div
				className="modal wp-block-ph-search-modal__fade"
				id="search-modal"
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
						aria-labelledby="search-modal-title"
					>
						<header className="wp-block-ph-search-modal__header">
							<button
								className="wp-block-ph-search-modal__close-button"
								aria-label="Close modal"
								data-micromodal-close
								></button>
						</header>
						<main
							className="wp-block-ph-search-modal__content"
							id="search-modal-content"
						>
							<form
								method="GET"
								class="wp-block-ph-search-modal__form wp-block-search"
								action="/"
							>
								<label
								class="screen-reader-text"
								for="search-modal-input">
									Search
								</label>
								<input
									id="search-modal-input"
									type="text"
									name="s"
									className="wp-block-ph-search-modal__form-input wp-block-search__input"
									placeholder="Search..."
									required
								/>
								
								<button
									type="submit"
									className="wp-block-ph-search-modal__form-button wp-block-button__link"
									style={{ cursor: 'pointer' }}
								>
									Search
								</button>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
