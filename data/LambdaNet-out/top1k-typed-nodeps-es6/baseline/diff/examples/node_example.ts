import 'colors';
import Diff from '../';

var one: String = 'beep boop';
var other: String = 'beep boob blah';

var diff: Array = Diff.diffChars(one, other);

diff.forEach(function(part: HTMLElement){
  // green for additions, red for deletions
  // grey for common parts
  var color: String = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  process.stderr.write(part.value[color]);
});

console.log();
