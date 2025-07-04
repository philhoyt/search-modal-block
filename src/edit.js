import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	TextControl,
	ToggleControl,
	Button,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	ButtonGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

// Predefined size options
const ICON_SIZE_OPTIONS = {
	small: '1rem',
	medium: '1.5rem',
	large: '2rem',
	xlarge: '2.5rem',
};

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		blockId,
		placeholderText,
		buttonText,
		labelText,
		showLabel,
		iconUrl,
		iconSize,
	} = attributes;
	const blockProps = useBlockProps();
	const [ error, setError ] = useState( '' );
	const [ isCustomSize, setIsCustomSize ] = useState(
		! Object.values( ICON_SIZE_OPTIONS ).includes( iconSize )
	);

	// Define available units for the UnitControl
	const units = useCustomUnits( {
		availableUnits: [ 'px', 'em', 'rem', '%' ],
		defaultValues: { px: 24, em: 1.5, rem: 1.5, '%': 100 },
	} );

	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ clientId, blockId, setAttributes ] );

	const handleMediaSelect = ( media ) => {
		if ( ! media || ! media.url ) {
			setError( __( 'Invalid media selection.', 'search-modal-block' ) );
			return;
		}
		setError( '' );
		setAttributes( { iconUrl: media.url } );
	};

	// Get the current size preset name or 'custom'
	const getCurrentSizePreset = () => {
		for ( const [ name, value ] of Object.entries( ICON_SIZE_OPTIONS ) ) {
			if ( value === iconSize ) {
				return name;
			}
		}
		return 'custom';
	};

	// Handle size preset button click
	const handleSizePresetClick = ( preset ) => {
		if ( preset === 'custom' ) {
			setIsCustomSize( true );
		} else {
			setIsCustomSize( false );
			setAttributes( { iconSize: ICON_SIZE_OPTIONS[ preset ] } );
		}
	};

	// Icon style with the selected size
	const iconStyle = {
		width: iconSize,
		height: iconSize,
	};

	const currentSizePreset = getCurrentSizePreset();

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Modal Settings', 'search-modal-block' ) }
					resetAll={ () => {
						setAttributes( {
							placeholderText: __(
								'Search…',
								'search-modal-block'
							),
							buttonText: __( 'Search', 'search-modal-block' ),
							labelText: __(
								'Open search',
								'search-modal-block'
							),
							showLabel: false,
						} );
					} }
				>
					<ToolsPanelItem
						hasValue={ () =>
							placeholderText !==
							__( 'Search…', 'search-modal-block' )
						}
						label={ __( 'Placeholder Text', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () =>
							setAttributes( {
								placeholderText: __(
									'Search…',
									'search-modal-block'
								),
							} )
						}
					>
						<TextControl
							__nextHasNoMarginBottom
							label={ __(
								'Placeholder Text',
								'search-modal-block'
							) }
							value={ placeholderText }
							onChange={ ( value ) =>
								setAttributes( { placeholderText: value } )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							buttonText !== __( 'Search', 'search-modal-block' )
						}
						label={ __( 'Button Text', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () =>
							setAttributes( {
								buttonText: __(
									'Search',
									'search-modal-block'
								),
							} )
						}
					>
						<TextControl
							__nextHasNoMarginBottom
							label={ __( 'Button Text', 'search-modal-block' ) }
							value={ buttonText }
							onChange={ ( value ) =>
								setAttributes( { buttonText: value } )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							labelText !==
							__( 'Open search', 'search-modal-block' )
						}
						label={ __( 'Label Text', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () =>
							setAttributes( {
								labelText: __(
									'Open search',
									'search-modal-block'
								),
							} )
						}
					>
						<TextControl
							__nextHasNoMarginBottom
							label={ __( 'Label Text', 'search-modal-block' ) }
							value={ labelText }
							onChange={ ( value ) =>
								setAttributes( { labelText: value } )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () => showLabel !== false }
						label={ __( 'Show Label', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () =>
							setAttributes( { showLabel: false } )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Show Label', 'search-modal-block' ) }
							checked={ showLabel }
							onChange={ ( value ) =>
								setAttributes( { showLabel: value } )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={ __( 'Icon Settings', 'search-modal-block' ) }
					resetAll={ () => {
						setAttributes( {
							iconUrl: '',
							iconSize: ICON_SIZE_OPTIONS.medium,
						} );
						setIsCustomSize( false );
					} }
				>
					<ToolsPanelItem
						hasValue={ () => !! iconUrl }
						label={ __( 'Button Icon', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () => setAttributes( { iconUrl: '' } ) }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ handleMediaSelect }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ iconUrl }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant="secondary"
									>
										{ iconUrl
											? __(
													'Replace Icon',
													'search-modal-block'
											  )
											: __(
													'Add Custom Icon',
													'search-modal-block'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ iconUrl && (
							<Button
								onClick={ () =>
									setAttributes( { iconUrl: '' } )
								}
								variant=""
								isDestructive
								style={ { marginTop: '8px' } }
							>
								{ __( 'Remove Icon', 'search-modal-block' ) }
							</Button>
						) }
						{ error && (
							<p className="components-notice is-error">
								{ error }
							</p>
						) }
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () => iconSize !== ICON_SIZE_OPTIONS.medium }
						label={ __( 'Icon Size', 'search-modal-block' ) }
						isShownByDefault
						onDeselect={ () => {
							setAttributes( {
								iconSize: ICON_SIZE_OPTIONS.medium,
							} );
							setIsCustomSize( false );
						} }
					>
						<div className="search-modal-icon-size-control">
							<ButtonGroup style={ { marginBottom: '8px' } }>
								<Button
									isPrimary={ currentSizePreset === 'small' }
									isSecondary={
										currentSizePreset !== 'small'
									}
									onClick={ () =>
										handleSizePresetClick( 'small' )
									}
								>
									{ __( 'S', 'search-modal-block' ) }
								</Button>
								<Button
									isPrimary={ currentSizePreset === 'medium' }
									isSecondary={
										currentSizePreset !== 'medium'
									}
									onClick={ () =>
										handleSizePresetClick( 'medium' )
									}
								>
									{ __( 'M', 'search-modal-block' ) }
								</Button>
								<Button
									isPrimary={ currentSizePreset === 'large' }
									isSecondary={
										currentSizePreset !== 'large'
									}
									onClick={ () =>
										handleSizePresetClick( 'large' )
									}
								>
									{ __( 'L', 'search-modal-block' ) }
								</Button>
								<Button
									isPrimary={ currentSizePreset === 'xlarge' }
									isSecondary={
										currentSizePreset !== 'xlarge'
									}
									onClick={ () =>
										handleSizePresetClick( 'xlarge' )
									}
								>
									{ __( 'XL', 'search-modal-block' ) }
								</Button>
								<Button
									isPrimary={ currentSizePreset === 'custom' }
									isSecondary={
										currentSizePreset !== 'custom'
									}
									onClick={ () =>
										handleSizePresetClick( 'custom' )
									}
								>
									{ __( 'Custom', 'search-modal-block' ) }
								</Button>
							</ButtonGroup>

							{ isCustomSize && (
								<UnitControl
									label={ __(
										'Custom Size',
										'search-modal-block'
									) }
									labelPosition="edge"
									value={ iconSize }
									onChange={ ( value ) =>
										setAttributes( { iconSize: value } )
									}
									units={ units }
								/>
							) }
						</div>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<button className="wp-block-ph-search-modal__button">
					{ iconUrl ? (
						<img
							src={ iconUrl }
							alt={ __( 'Search', 'search-modal-block' ) }
							className="wp-block-ph-search-modal__custom-icon"
							style={ iconStyle }
						/>
					) : (
						<Icon icon={ search } style={ iconStyle } />
					) }
				</button>
			</div>
		</>
	);
}
