import jQuery from "../../core.js";

export default function( elem: object, dir: string, until: number ) {
	var matched: any[] = [],
		truncate: boolean = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
}
