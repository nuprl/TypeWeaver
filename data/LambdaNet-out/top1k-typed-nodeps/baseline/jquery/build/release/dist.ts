"use strict";

module.exports = function( Release: object, files: any[], complete: Function ) {

	const fs: Function = require( "fs" ).promises;
	const shell: string = require( "shelljs" );
	const inquirer: string = require( "inquirer" );
	const pkg: object = require( `${ Release.dir.repo }/package.json` );
	const distRemote: string = Release.remote

		// For local and github dists
		.replace( /jquery(\.git|$)/, "jquery-dist$1" );

	// These files are included with the distribution
	const extras: any[] = [
		"amd",
		"src",
		"LICENSE.txt",
		"AUTHORS.txt",
		"package.json"
	];

	/**
	 * Clone the distribution repo
	 */
	function clone(): void {
		Release.chdir( Release.dir.base );
		Release.dir.dist = `${ Release.dir.base }/dist`;

		console.log( "Using distribution repo: ", distRemote );
		Release.exec( `git clone ${ distRemote } ${ Release.dir.dist }`,
			"Error cloning repo." );

		// Distribution always works on main
		Release.chdir( Release.dir.dist );
		Release.exec( "git checkout main", "Error checking out branch." );
		console.log();
	}

	/**
	 * Generate bower file for jquery-dist
	 */
	function generateBower(): string {
		return JSON.stringify( {
			name: pkg.name,
			main: pkg.main,
			license: "MIT",
			ignore: [
				"package.json"
			],
			keywords: pkg.keywords
		}, null, 2 );
	}

	/**
	 * Replace the version in the README
	 * @param {string} readme
	 * @param {string} blogPostLink
	 */
	function editReadme( readme: string, blogPostLink: string ): string {
		return readme
			.replace( /@VERSION/g, Release.newVersion )
			.replace( /@BLOG_POST_LINK/g, blogPostLink );
	}

	/**
	 * Copy necessary files over to the dist repo
	 */
	async function copy(): Promise {

		// Copy dist files
		const distFolder: string = `${ Release.dir.dist }/dist`;
		const readme: string = await fs.readFile(
			`${ Release.dir.repo }/build/fixtures/README.md`, "utf8" );
		const rmIgnore: any[] = [ ...files, "node_modules" ]
			.map( (file: string) => `${ Release.dir.dist }/${ file }` );

		shell.config.globOptions = {
			ignore: rmIgnore
		};

		const { blogPostLink } = await inquirer.prompt( [ {
			type: "input",
			name: "blogPostLink",
			message: "Enter URL of the blog post announcing the jQuery release...\n"
		} ] );

		// Remove extraneous files before copy
		shell.rm( "-rf", `${ Release.dir.dist }/**/*` );

		shell.mkdir( "-p", distFolder );
		files.forEach( function( file: string ) {
			shell.cp( "-f", `${ Release.dir.repo }/${ file }`, distFolder );
		} );

		// Copy other files
		extras.forEach( function( file: string ) {
			shell.cp( "-rf", `${ Release.dir.repo }/${ file }`, Release.dir.dist );
		} );

		// Remove the wrapper & the ESLint config from the dist repo
		shell.rm( "-f", `${ Release.dir.dist }/src/wrapper.js` );
		shell.rm( "-f", `${ Release.dir.dist }/src/.eslintrc.json` );

		// Write generated bower file
		await fs.writeFile( `${ Release.dir.dist }/bower.json`, generateBower() );

		await fs.writeFile( `${ Release.dir.dist }/README.md`,
			editReadme( readme, blogPostLink ) );

		console.log( "Files ready to add." );
	}

	/**
	 * Add, commit, and tag the dist files
	 */
	function commit(): void {
		console.log( "Adding files to dist..." );
		Release.exec( "git add -A", "Error adding files." );
		Release.exec(
			`git commit -m "Release ${ Release.newVersion }"`,
			"Error committing files."
		);
		console.log();

		console.log( "Tagging release on dist..." );
		Release.exec( `git tag ${ Release.newVersion }`,
			`Error tagging ${ Release.newVersion } on dist repo.` );
		Release.tagTime = Release.exec( "git log -1 --format=\"%ad\"",
			"Error getting tag timestamp." ).trim();
	}

	/**
	 * Push files to dist repo
	 */
	function push(): void {
		Release.chdir( Release.dir.dist );

		console.log( "Pushing release to dist repo..." );
		Release.exec(
			`git push ${
				Release.isTest ? " --dry-run" : ""
			} ${ distRemote } main --tags`,
			"Error pushing main and tags to git repo."
		);

		// Set repo for npm publish
		Release.dir.origRepo = Release.dir.repo;
		Release.dir.repo = Release.dir.dist;
	}

	Release.walk( [
		Release._section( "Copy files to distribution repo" ),
		clone,
		copy,
		Release.confirmReview,

		Release._section( "Add, commit, and tag files in distribution repo" ),
		commit,
		Release.confirmReview,

		Release._section( "Pushing files to distribution repo" ),
		push
	], complete );
};
