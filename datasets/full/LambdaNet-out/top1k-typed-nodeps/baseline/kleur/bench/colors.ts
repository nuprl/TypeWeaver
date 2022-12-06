const chalk: object = require('chalk');
const ansi: object = require('ansi-colors');
const { Suite } = require('benchmark');
const colors: any[] = require('../colors');
const kleur: object = require('../index');

// All color/method names
const names: any[] = ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

function bench(name: string): HTMLElement {
	console.log(`\n# ${name}`);
	const suite: HTMLElement = new Suite();
	const previous: Function = suite.add.bind(suite);
	suite.on('cycle', (e: HTMLElement) => console.log('  ' + e.target));
	suite.add = (name: string, runner: any[]) => previous(name.padEnd(16), runner);
	return suite;
}


bench('All Colors')
	.add('ansi-colors', () => {
		names.forEach((name: string) => ansi[name]('foo'));
	})
	.add('chalk', () => {
		names.forEach((name: string) => chalk[name]('foo'));
	})
	.add('kleur', () => {
		names.forEach((name: string) => kleur[name]('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach((name: string) => colors[name]('foo'));
	})
	.run();


bench('Stacked colors')
	.add('ansi-colors', () => {
		names.forEach((name: string) => ansi[name].bold.underline.italic('foo'));
	})
	.add('chalk', () => {
		names.forEach((name: string) => chalk[name].bold.underline.italic('foo'));
	})
	.add('kleur', () => {
		names.forEach((name: string) => kleur[name]().bold().underline().italic('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach((name: string) => colors[name](colors.bold(colors.underline(colors.italic('foo')))));
	})
	.run();


bench('Nested colors')
	.add('ansi-colors', () => fixture(ansi))
	.add('chalk', () => fixture(chalk))
	.add('kleur', () => fixture(kleur))
	.add('kleur/colors', () => fixture(colors))
	.run();


function fixture(lib: HTMLElement): string {
	return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
