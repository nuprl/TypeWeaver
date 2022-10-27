/*global document */
(() => {
    const source: Object = document.getElementsByClassName('prettyprint source linenums');
    let i: Number = 0;
    let lineNumber: Number = 0;
    let lineId: String;
    let lines: Array;
    let totalLines: Number;
    let anchorHash: String;

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
