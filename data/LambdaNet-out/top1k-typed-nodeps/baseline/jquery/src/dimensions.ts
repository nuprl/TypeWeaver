import jQuery from "./core.js";
import access from "./core/access.js";
import isWindow from "./var/isWindow.js";

import "./css.js";

// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name: string, type: string ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra: boolean, funcName: string ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin: string, value: number ) {
			var chainable: boolean = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra: string = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem: object, type: string, value: number ) {
				var doc: object;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );

export default jQuery;
