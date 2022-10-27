const chalk: Object = require('chalk');
const ansi: Object = require('ansi-colors');
const { Suite } = require('benchmark');
const colors: Array = require('../colors');
const kleur: Object = require('../index');

// All color/method names
const names: Array = ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

function bench(name: String): HTMLElement {
	console.log(`\n# ${name}`);
	const suite: HTMLElement = new Suite();
	const previous: Function = suite.add.bind(suite);
	suite.on('cycle', (e: HTMLElement) => console.log('  ' + e.target));
	suite.add = (name: String, runner: Array) => previous(name.padEnd(16), runner);
	return suite;
}


bench('All Colors')
	.add('ansi-colors', () => {
		names.forEach((name: String) => ansi[name]('foo'));
	})
	.add('chalk', () => {
		names.forEach((name: String) => chalk[name]('foo'));
	})
	.add('kleur', () => {
		names.forEach((name: String) => kleur[name]('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach((name: String) => colors[name]('foo'));
	})
	.run();


bench('Stacked colors')
	.add('ansi-colors', () => {
		names.forEach((name: String) => ansi[name].bold.underline.italic('foo'));
	})
	.add('chalk', () => {
		names.forEach((name: String) => chalk[name].bold.underline.italic('foo'));
	})
	.add('kleur', () => {
		names.forEach((name: String) => kleur[name]().bold().underline().italic('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach((name: String) => colors[name](colors.bold(colors.underline(colors.italic('foo')))));
	})
	.run();


bench('Nested colors')
	.add('ansi-colors', () => fixture(ansi))
	.add('chalk', () => fixture(chalk))
	.add('kleur', () => fixture(kleur))
	.add('kleur/colors', () => fixture(colors))
	.run();


function fixture(lib: HTMLElement): String {
	return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
