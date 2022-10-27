const colors: Object = require('..');

colors.alias('primary', colors.yellow);
colors.alias('strong', colors.bold);
console.log(colors.primary.strong('Foo'));
