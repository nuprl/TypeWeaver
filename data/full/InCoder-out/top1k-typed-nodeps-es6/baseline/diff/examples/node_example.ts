import 'colors';
import Diff from '../';

var one = 'beep boop';
var other = 'beep boob blah';

var diff = Diff.diffChars(one, other);

diff.forEach(function(part: Part){
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  process.stderr.write(part.value[color]);
});

console.log();