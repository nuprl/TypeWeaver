function nodeName( elem: Element, name : string) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}

export default nodeName;