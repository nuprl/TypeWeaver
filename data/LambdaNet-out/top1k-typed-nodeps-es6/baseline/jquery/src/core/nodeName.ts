function nodeName( elem: HTMLElement, name: string ): boolean {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}

export default nodeName;
