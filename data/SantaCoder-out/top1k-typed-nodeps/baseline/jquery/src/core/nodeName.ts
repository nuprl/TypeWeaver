function nodeName( elem: Node, name : string) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}

export default nodeName;