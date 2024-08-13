import { Icon, search } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Icon icon={ search } />
		</div>
	);
}
