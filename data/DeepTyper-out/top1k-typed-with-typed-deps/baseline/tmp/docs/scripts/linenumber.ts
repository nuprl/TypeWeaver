/*global document */
(() => {
    const source: string[] = document.getElementsByClassName('prettyprint source linenums');
    let i: number = 0;
    let lineNumber: number = 0;
    let lineId: number;
    let lines: string[];
    let totalLines: any;
    let anchorHash: any;

    if (source && source[0]) {
        anchorHash = document.location.hash.substring(1);
        lines = source[0].getElementsByTagName('li');
        totalLines = lines.length;

        for (; i < totalLines; i++) {
            lineNumber++;
            lineId = `line${lineNumber}`;
            lines[i].id = lineId;
            if (lineId === anchorHash) {
                lines[i].className += ' selected';
            }
        }
    }
})();
