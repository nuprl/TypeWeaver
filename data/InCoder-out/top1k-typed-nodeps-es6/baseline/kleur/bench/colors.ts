import chalk from 'chalk';
import ansi from 'ansi-colors';
import { Suite } from 'benchmark';
import colors from '../colors';
import kleur from '../index';

// All color/method names
const names = ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

function bench(name: String) {
	console.log(`\n# ${name}`);
	const suite = new Suite();
	const previous = suite.add.bind(suite);
	suite.on('cycle', e => console.log('  ' + e.target));
	suite.add = (name, runner) => previous(name.padEnd(16), runner);
	return suite;
}


bench('All Colors')
	.add('ansi-colors', () => {
		names.forEach(name => ansi[name]('foo'));
	})
	.add('chalk', () => {
		names.forEach(name => chalk[name]('foo'));
	})
	.add('kleur', () => {
		names.forEach(name => kleur[name]('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach(name => colors[name]('foo'));
	})
	.run();


bench('Stacked colors')
	.add('ansi-colors', () => {
		names.forEach(name => ansi[name].bold.underline.italic('foo'));
	})
	.add('chalk', () => {
		names.forEach(name => chalk[name].bold.underline.italic('foo'));
	})
	.add('kleur', () => {
		names.forEach(name => kleur[name]().bold().underline().italic('foo'));
	})
	.add('kleur/colors', () => {
		names.forEach(name => colors[name](colors.bold(colors.underline(colors.italic('foo')))));
	})
	.run();


bench('Nested colors')
	.add('ansi-colors', () => fixture(ansi))
	.add('chalk', () => fixture(chalk))
	.add('kleur', () => fixture(kleur))
	.add('kleur/colors', () => fixture(colors))
	.run();


function fixture(lib: Library) {
	return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}