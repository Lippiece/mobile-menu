import { css } from "@emotion/css";

Element.prototype.appendTo = function( parent )
{
	parent.append( this );

	return this;
};
Element.prototype.addId    = function( id )
{
	this.id = id;

	return this;
};
Element.prototype.addStyles = function( styles )
{
	typeof styles === "object" ? this.classList.add( ...styles ) : this.classList.add( styles );

	return this;
};
const _body                 = document.querySelector( "body" )
		.addStyles( css( {
			"--mainColor"  : "hsla(15, 100%, 60%, 0.7)",
			backgroundColor: "#222",
			height         : "100vh",
			width          : "100vw",
			display        : "flex",
			flexDirection  : "column",
			justifyContent : "center",
			alignItems     : "center",
			color          : "var( --mainColor )",
			"&>*"          : { margin: "0.5em" },
		} ) ),
	dropdownContentStyle = css( {
		display      : "flex",
		flexDirection: "column-reverse",
		width        : "100%",
		overflow     : "auto",

		"&>li": {
			listStyleType: "none",
			padding      : "0.5em",
			color        : "white",
			fontSize     : "1.5em",

			"&>button": {
				border    : "none",
				outline   : "none",
				background: "none",
				color     : "white",
				fontSize  : "1.5em",
				width     : "100%",
				cursor    : "pointer",
				"&:hover" : { filter: "drop-shadow(0 0 0.2em var(--mainColor))" },
				"&:focus" : { outline: "none" },
			},
		},
	} ),
	content = document.querySelector( "#content" );

initializeMobileMenu( content );
function addButtonLogic( mobileMenu )
{
	const open = css( { visibility: "initial" } ),
		closed = css( { visibility: "hidden" } ),
		dropdownContent = mobileMenu.querySelector( "#dropdownContent" );

	dropdownContent.classList.add( closed, open );
	mobileMenu.querySelector( "#floating-button" )
		.addEventListener( "click", () =>
		{ dropdownContent.classList.toggle( closed ) } );
	mobileMenu.addEventListener( "mouseleave", () =>
	{
		if ( !dropdownContent.classList.contains( closed ) )
		{ dropdownContent.classList.toggle( closed ) }
	} );
}
function initializeMenuItem( parent )
{
	const menuItemsStyle = css( {
			border    : "none",
			outline   : "none",
			background: "none",
			color     : "white",
			fontSize  : "3em",
			width     : "100%",
			cursor    : "pointer",
			"&:hover" : { filter: "drop-shadow(0 0 0.2em var(--mainColor))" },
			"&:focus" : { outline: "none" },
		} ),
	 floatingButton = document.createElement( "button" )
			.addStyles( menuItemsStyle )
			.addId( "floating-button" )
			.appendTo( parent ),
		icon = document.createElement( "span" )
			.addStyles( "iconify" )
			.addId( "floating-button-icon" )
			.appendTo( floatingButton );

	icon.dataset.icon = "file-icons:actionscript";
}
function initializeDropdownContent( parent )
{
	const dropdownContent = document.createElement( "ul" )
		.addStyles( dropdownContentStyle )
		.addId( "dropdownContent" )
		.appendTo( parent );

	initializeDropdownItems( dropdownContent );

}
function initializeDropdownItems( parent )
{
	for ( let index = 0; index < 3; index++ )
	{
		const item = document.createElement( "li" )
				.appendTo( parent )
				.addId( `dropdown-item-${ index+1 }` ),
			button = document.createElement( "button" )
				.appendTo( item ),
			icon = document.createElement( "span" )
				.addStyles( "iconify" )
				.appendTo( button );

		icon.dataset.icon = "file-icons:actionscript";
		item.title        = `Item ${ index+1 }`;
	}
}
export default function initializeMobileMenu( parent )
{
	const mobileMenuStyle = css( {
			width         : "fit-content",
			display       : "flex",
			flexDirection : "column-reverse",
			justifyContent: "center",
			alignItems    : "center",
		} ),
		mobileMenu = document.createElement( "div" )
			.addStyles( mobileMenuStyle )
			.addId( "mobile-menu" );

	initializeMenuItem( mobileMenu );
	initializeDropdownContent( mobileMenu );
	addButtonLogic( mobileMenu );
	parent.append( mobileMenu );
}
