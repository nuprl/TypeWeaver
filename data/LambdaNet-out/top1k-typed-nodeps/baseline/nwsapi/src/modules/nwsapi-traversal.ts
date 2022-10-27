/*
 * Element Traversal methods from Juriy Zaytsev (kangax)
 * used to emulate Prototype up/down/previous/next methods
 */

(function(D: Object){

  // TODO: all of this needs tests
  var match: Object = D.match, select: Function = D.select, root: Element = document.documentElement,

  // Use the Element Traversal API if available.
  nextElement: String = 'nextElementSibling',
  previousElement: String = 'previousElementSibling',
  parentElement: String = 'parentElement';

  // Fall back to the DOM Level 1 API.
  if (!(nextElement in root)) nextElement = 'nextSibling';
  if (!(previousElement in root)) previousElement = 'previousSibling';
  if (!(parentElement in root)) parentElement = 'parentNode';

  function walkElements(property: String, element: Object, expr: Number): Object {
    var i: Number = 0, isIndex: Boolean = typeof expr == 'number';
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
  function up(element: Element, expr: Function): String {
    return walkElements(parentElement, element, expr);
  }
  /**
   * @method next
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function next(element: Element, expr: Function): String {
    return walkElements(nextElement, element, expr);
  }
  /**
   * @method previous
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function previous(element: Element, expr: Function): String {
    return walkElements(previousElement, element, expr);
  }
  /**
   * @method down
   * @param {HTMLElement} element element to walk from
   * @param {String | Number} expr CSS expression or an index
   * @return {HTMLElement | null}
   */
  function down(element: Object, expr: String): Object {
    var isIndex: Boolean = typeof expr == 'number', descendants: Object, index: Number, descendant: Function;
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
