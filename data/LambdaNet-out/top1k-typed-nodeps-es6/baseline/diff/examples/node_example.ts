import 'colors';
import Diff from '../';

var one: string = 'beep boop';
var other: string = 'beep boob blah';

var diff: any[] = Diff.diffChars(one, other);

diff.forEach(function(part: HTMLElement){
  // green for additions, red for deletions
  // grey for common parts
  var color: string = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  process.stderr.write(part.value[color]);
});

console.log();
