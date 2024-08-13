import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<button
				className="search-modal-button"
				data-micromodal-trigger="search-modal"
				style={{ background: 'none', border: 'none', cursor: 'pointer' }}
			>
				<Icon icon={ search } />
			</button>

			<div className="modal micromodal-fade" id="search-modal" aria-hidden="true">
				<div className="modal__overlay" tabIndex="-1" data-micromodal-close>
					<div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
						<header className="modal__header">
							<button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
						</header>
						<main className="modal__content" id="search-modal-content">
							<form method="GET" action="/">
								<input
									type="text"
									name="s"
									className="search-modal-input"
									placeholder="Search..."
									required
								/>
								<button
									type="submit"
									className="modal__btn modal__btn-primary"
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
