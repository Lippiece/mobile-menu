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
const mainColor             = css( { color: "hsla(15, 100%, 60%, 0.7)" } ),
	_body = document.querySelector( "body" )
		.addStyles( css( {
			backgroundColor: "#222",
			height         : "100vh",
			width          : "100vw",
			display        : "flex",
			flexDirection  : "column",
			justifyContent : "center",
			alignItems     : "center",
			color          : mainColor,
			"&>*"          : { margin: "0.5em" },
		} ) ),
	mainBackgroundColor = "hsla(15, 100%, 60%, 0.7)",
	centerFlex = css( {
		display       : "flex",
		flexDirection : "row",
		justifyContent: "center",
		alignItems    : "center",
	} ),
	content = document.querySelector( "#content" );

initializeMobileMenu( content );
function addButtonLogic( mobileMenu )
{
	const open = css( { visibility: "initial" } ),
		closed = css( { visibility: "hidden" } ),
		dropdownContent = mobileMenu.querySelector( "#dropdownContent" );

	dropdownContent.classList.add( closed, open );
	mobileMenu.querySelector( "#menu1" )
		.addEventListener( "click", () =>
		{ dropdownContent.classList.toggle( closed ) } );
	mobileMenu.addEventListener( "mouseleave", () =>
	{
		if ( !dropdownContent.classList.contains( closed ) )
		{ dropdownContent.classList.toggle( closed ) }
	} );
}
function initializeMenuItems( parent )
{
	const menuItemsStyle = css( {
		backgroundColor: "hsla(15, 100%, 60%, 0.5)",
		border         : "none",
		color          : "white",
		fontSize       : "1.5em",
		padding        : "0.5em",
		width          : "100%",
		cursor         : "pointer",
		"&:hover"      : { boxShadow: "0px 0px 0.5em rgba(0, 0, 0, 1)" },
		"&:focus"      : { outline: "none" },
	} );

	for ( const name of [ "Menu 1", "Menu 2", "Menu 3" ] )
	{
		const menuItem = document.createElement( "button" )
			.addStyles( menuItemsStyle )
			// add id "menu + name index"
			.addId( `menu${ name.split( " " )[ 1 ] }` )
			.appendTo( parent );

		menuItem.textContent = name;
	}
}
function initializeDropdownContent( parent )
{
	const dropdownContentStyle = css( {
			position       : "absolute",
			backgroundColor: "#111",
			width          : "100%",
			top            : "100%",
			overflow       : "auto",
			boxShadow      : "0 0 10px rgba(0, 0, 0, 0.5)",
			"&>li"         : {
				listStyleType: "none",
				padding      : "0.5em",
				color        : "white",
				fontSize     : "1.5em",
				"&:hover"    : {
					boxShadow      : "0px 0px 10px rgba(0, 0, 0, 1)",
					backgroundColor: mainBackgroundColor,
				 },
			},
		}, centerFlex ),
		dropdownContent = document.createElement( "ul" )
			.addStyles( dropdownContentStyle )
			.addId( "dropdownContent" )
			.appendTo( parent );

	initializeDropdownItems( dropdownContent );

}
function initializeDropdownItems( parent )
{
	for ( const name of [ "Item 1", "Item 2", "Item 3" ] )
	{
		const item = document.createElement( "li" )
			.appendTo( parent );

		item.textContent = name;
	}
}
export default function initializeMobileMenu( parent )
{
	const mobileMenuStyle = css( {
			position: "relative",
			width   : "fit-content",
		}, centerFlex ),
		mobileMenu = document.createElement( "div" )
			.addStyles( mobileMenuStyle )
			.addId( "mobile-menu" );

	initializeMenuItems( mobileMenu );
	initializeDropdownContent( mobileMenu );
	addButtonLogic( mobileMenu );
	parent.append( mobileMenu );
}
