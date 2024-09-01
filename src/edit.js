import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps();

	// Set blockId using clientId if it's not already set
	useEffect(() => {
		if (!attributes.blockId) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	return (
		<div { ...blockProps }>
			<button
				className="wp-block-ph-search-modal__button"
			>
				<Icon icon={ search } />
			</button>
		</div>
	);
}