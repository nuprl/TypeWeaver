function nodeName( elem: HTMLElement, name: String ): Boolean {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}

export default nodeName;
