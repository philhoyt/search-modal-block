import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { blockId, placeholderText, buttonText, labelText } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<button
				className="wp-block-ph-search-modal__button"
				data-micromodal-trigger={ blockId }
				aria-label={ labelText }
			>
				<Icon icon={ search } />
			</button>

			<div
				className="modal wp-block-ph-search-modal__fade"
				id={ blockId }
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
								aria-label={ labelText }
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
									className="screen-reader-text"
									htmlFor={`${blockId}-input`}>
									{ labelText }
								</label>
								<input
									id={`${blockId}-input`}
									type="text"
									name="s"
									className="wp-block-ph-search-modal__form-input wp-block-search__input"
									placeholder={ placeholderText }
									required
								/>
								
								<div className="wp-block-button">
									<button
										type="submit"
										className="wp-block-ph-search-modal__form-button wp-block-button__link"
										style={{ cursor: 'pointer' }}
									>
										{ buttonText }
									</button>
								</div>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
