/*
 * Element Traversal methods from Juriy Zaytsev (kangax)
 * used to emulate Prototype up/down/previous/next methods
 */

(function(D: object){

  // TODO: all of this needs tests
  var match: object = D.match, select: Function = D.select, root: Element = document.documentElement,

  // Use the Element Traversal API if available.
  nextElement: string = 'nextElementSibling',
  previousElement: string = 'previousElementSibling',
  parentElement: string = 'parentElement';

  // Fall back to the DOM Level 1 API.
  if (!(nextElement in root)) nextElement = 'nextSibling';
  if (!(previousElement in root)) previousElement = 'previousSibling';
  if (!(parentElement in root)) parentElement = 'parentNode';

  function walkElements(property: string, element: object, expr: number): object {
    var i: number = 0, isIndex: boolean = typeof expr == 'number';
    if (typeof expr == 'undefined') {
      isIndex = true;
      expr = 0;
    }
    while ((element = element[property])) {
      if (element.nodeType != 1) continue;
      if (isIndex) {
        ++i;
        if (i == expr) return element;
      } else if (match(element, expr)) {
        return element;
      }
    }
    return null;
  }

  /**
   * @method up
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function up(element: Element, expr: Function): string {
    return walkElements(parentElement, element, expr);
  }
  /**
   * @method next
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function next(element: Element, expr: Function): string {
    return walkElements(nextElement, element, expr);
  }
  /**
   * @method previous
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function previous(element: Element, expr: Function): string {
    return walkElements(previousElement, element, expr);
  }
  /**
   * @method down
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function down(element: object, expr: string): object {
    var isIndex: boolean = typeof expr == 'number', descendants: object, index: number, descendant: Function;
    if (expr === null) {
      element = element.firstChild;
      while (element && element.nodeType != 1) element = element[nextElement];
      return element;
    }
    if (!isIndex && match(element, expr) || isIndex && expr === 0) return element;
    descendants = select('*', element);
    if (isIndex) return descendants[expr] || null;
    index = 0;
    while ((descendant = descendants[index]) && !match(descendant, expr)) { ++index; }
    return descendant || null;
  }
  D.up = up;
  D.down = down;
  D.next = next;
  D.previous = previous;
})(NW.Dom);
