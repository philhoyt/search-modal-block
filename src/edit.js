import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { blockId, placeholderText, buttonText, labelText, showLabel } =
		attributes;
	const blockProps = useBlockProps();

	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ clientId, blockId, setAttributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Search Modal Settings',
						'search-modal-block'
					) }
				>
					<TextControl
						label={ __( 'Placeholder Text', 'search-modal-block' ) }
						value={ placeholderText }
						onChange={ ( value ) =>
							setAttributes( { placeholderText: value } )
						}
					/>
					<TextControl
						label={ __( 'Button Text', 'search-modal-block' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
					<TextControl
						label={ __( 'Label Text', 'search-modal-block' ) }
						value={ labelText }
						onChange={ ( value ) =>
							setAttributes( { labelText: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Label', 'search-modal-block' ) }
						checked={ showLabel }
						onChange={ ( value ) =>
							setAttributes( { showLabel: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<button className="wp-block-ph-search-modal__button">
					<Icon icon={ search } />
				</button>
			</div>
		</>
	);
}
