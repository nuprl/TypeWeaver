# README

This directory is organized as follows:

  * `notes/`: notes, logs, and documentation about the dataset and results

  * `original/`: dataset downloaded from GitHub; used for experiments
  * `groundtruth/`: handwritten `.d.ts` type definitions from DefinitelyTyped
     and project repos
  * `node_modules/`: dependencies for the dataset
  * `from_tarballs/`: dataset extracted from tarballs; used to derive `original/`

  * `DeepTyper-out/`: output from running DeepTyper
  * `InCoder-out/`: output from running InCoder
  * `LambdaNet-out/`: output from running LambdaNet
  * `SantaCoder-out/`: output from running SantaCoder

## Datasets

There are four datasets, extracted from the `top1k-plus` dataset:

  * `top1k-typed-nodeps-es6`
    * **245** packages that are typed and have no dependencies
  * `top1k-untyped-nodeps-es6`
    * **91** packages that are untyped and have no dependencies
  * `top1k-typed-with-typed-deps-es6`
    * **65** packages that are typed and all their dependencies are typed
  * `top1k-untyped-with-typed-deps-es6`
    * **37** packages that are untyped and all their dependencies are typed

There are **438** packages in total.

These datasets were constructed from an original dataset without the `-es6`
suffix, by converting CommonJS modules to ECMAScript 6 modules. (Note that some
packages may already be in ES6 module format.) This gives us a total of eight
datasets.

The "CommonJS" datasets started with **506** packages, since some packages did
not successfully convert to ES6 modules. The number of packages per dataset is
listed below:

  * `top1k-typed-nodeps`: **282**
  * `top1k-untyped-nodeps`: **101** 
  * `top1k-typed-with-typed-deps`: **83**
  * `top1k-untyped-with-typed-deps`: **40**

`typed` means the package has type definitions in the
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
repository.

`from_tarballs` contains code that was extracted from NPM tarballs, which may be
compiled or minified code. `original` contains code that was cloned from GitHub
repositories.

The CSV files (located in the `notes` directory), generated by the
`src/dataset_tools/collect_dataset_stats.py` script, contain some basic
statistics about the number of lines of JavaScript and TypeScript code.

Further details are provided below.


## `top1k-plus`

The `top1k-plus` dataset contains the top 1000 most downloaded packages from
NPM, plus additional dependencies to ensure the set is closed. In other words,
all the packages in this dataset either have no dependencies, or depend on a
set of packages that are also in the dataset.

"devDependencies" are not counted as dependencies.

The download stats were scraped from NPM around August 2021. No packages were
filtered out.

There are **1147** packages in this set.

Dependencies were obtained by examining the `package.json` files.
devDependencies and version numbers were ignored.

Using [`jq`](https://stedolan.github.io/jq/), these were the approximate steps:

    ls > pkgs
    for i in `find . -type f -name "package.json"`; do \
        jq -r '.dependencies | keys | join("\n")' $i >> deps; \
    done
    cat deps | sort | uniq > deps_sorted
    diff pkgs deps_sorted | grep ">" | cut -d" " -f2

These steps were repeated until no more new dependencies were discovered.


## Automatic classification

The script `src/dataset_tools/check_dataset_in_definitely_typed.py` collects
typing information for the `top1k-plus` dataset, by checking if the package has
type definitions in DefinitelyTyped, and if the package's dependencies have
definitions in DefinitelyTyped. It also checks that a package contains
JavaScript files and is not simply a package of JSON files or type definitions.
The results were saved in `top1k-plus.csv`:

    cd data
    python ../src/dataset_tools/check_dataset_in_definitely_typed.py \
        --dataset /path/to/top1k-plus \
        --typings /path/to/DefinitelyTyped \
        > notes/top1k-plus.csv

There were **626** packages that contain code, and either have no dependencies
or all of their dependencies are typed. This dataset was categorized as:

  * 200 typed packages with no dependencies
  * 284 untyped packages with no dependencies
  * 78 typed packages with typed dependencies
  * 64 untyped packages with typed dependencies

These numbers do not match the final dataset counts, because some packages were
excluded, reclassified, or failed to download.


## Downloading package source code

The initial dataset (in the `from_tarballs` directory) is extracted from
tarballs published to NPM. The tarballs contain whatever the author published
to NPM, which may be compiled/minified code, but may also not correspond to the
package's source code.

Therefore, we need to download the original source code from the packages'
GitHub repositories. This is what the
`src/dataset_tools/download_pkg_src_from_github.py` script does:

    cd data
    for i in `ls from_tarballs`; do \
        mkdir -p originals/$i; \
        python ../src/dataset_tools/download_pkg_src_from_github.py \
            --dataset from_tarballs/$i \
            --output originals/$i; \
    done

The script clones the repository given by

    npm view [package] repository.url

and then deletes the `.git` directory to save space.

Some packages failed to download, for the following reasons:

  * no repository was specified by the package
  * the specified repository was actually a directory within a monorepo
  * the repository no longer exists
  * the repository is private


## Data cleaning and manual reclassification

This process was mostly done by hand, so some packages and files may have been
missed. 107 packages were removed, leaving behind **519** packages.

Broken and recursive symlinks were deleted.

### Excluding packages

Packages meeting any of the following criteria were deleted:

  * the package was implemented in TypeScript or CoffeeScript
  * the package was too large, i.e. it had over 10 KLOC of JavaScript or
    TypeScript
  * the package was built from within a monorepo

This is a JavaScript dataset, so we exclude TypeScript and CoffeeScript
projects. We also excluded packages that were too large to handle, which
includes packages with significant amounts of code or packages built from
monorepos. Excluding monorepos also helps us exclude duplicate source
repositories, since multiple packages can refer to the same source code
repository.

One way to check for monorepos is to compare the package's directory with the
name specified in `package.json`:

    cd data/original
    for i in `find . -maxdepth 3 -name "package.json"`; do \
        dir=`echo $i | cut -d'/' -f3`; \
        name=`jq -r ".name" $i`; \
        [[ $dir != $name ]] && echo $i $name; \
    done

If the names are different, then the package _may_ be a monorepo.

### Deleting test files and directories

Directories named `test`, `tests`, `__tests__`, or `spec` were deleted.
Files named `test.js` or `tests.js` were also deleted.

Files matching the following were deleted:

  * `*test262*.js`
  * `test-*.js`
  * `*-test.js`
  * `*.test-d.ts`
  * `*.test.js`
  * `*.spec.js`

### Manual reclassification

Initially, packages (and dependencies) were considered "typed" if they had
type definitions in DefinitelyTyped. However, some packages ship with their own
type definitions (`.d.ts` files), or generate type definitions from JSDoc.

Packages that contained `.d.ts` files in their repository were reclassified as
typed. However, package dependencies were not reclassified. As a result, some
packages may have been incorrectly excluded from the dataset, because their
dependencies were incorrectly classified as untyped.


## Installing type definitions of dependencies

We selected our dataset to contain packages that either have no dependencies, or
packages with dependencies that all have type definitions. The next step is to
install those type definitions.

The `src/dataset_tools/install_dependency_type_defs.py` script iterates over a
dataset, parses the `package.json` file, and installs dependency type
definitions.

The following mapping is used from packages to type definitions:

  * `@types/package` -> `@types/package`
  * `@abc/def` -> `@types/abc__def`
  * `package` -> `@types/package`

Dependencies are installed to `data/node_modules`. Some type definitions have
their own dependencies (which themselves may be actual packages and not type
definitions), which are transitively installed.

Dependencies that fail to install are investigated, and the packages that depend
on it are removed from the dataset. The automatic classification script may have
some errors, but the ultimate authority is whether a type definition can be
installed.

The depending packages can be identified by running the following (assuming the
failed dependencies are `dep1`, `dep2`, and `dep3`):

    cd data/original
    for i in `find . -maxdepth 3 -name "package.json"`; do \
        for d in dep1 dep2 dep3; do \
            jq -e ".dependencies | has(\"$d\")" $i > /dev/null \
                && echo $i $d; \
        done ; \
    done

6 packages were removed, leaving a total of **513**.


## Migrating to ES6

Most packages in the dataset were written using CommonJS modules, which use
`require` to import modules and `module.exports` to export. When migrated to
TypeScript, `require` is typed as a function that returns `any`; thus the
benefits of typing are lost. In contrast, ECMAScript 6 modules, which use
`import` and `export`, preserve types across module boundaries.

We duplicate our original dataset and convert packages to use ES6 modules. Our
`src/dataset_tools/transform_require_to_import.py` script copies the dataset
and uses [`cjs-to-es6`](https://github.com/nolanlawson/cjs-to-es6) to transform
the packages in place.

We ran the following commands:

    python src/dataset_tools/transform_require_to_import.py \
        --dataset data/original/top1k-typed-nodeps/
    python src/dataset_tools/transform_require_to_import.py \
        --dataset data/original/top1k-untyped-nodeps/
    python src/dataset_tools/transform_require_to_import.py \
        --dataset data/original/top1k-typed-with-typed-deps/
    python src/dataset_tools/transform_require_to_import.py \
        --dataset data/original/top1k-untyped-with-typed-deps/

The migration succeeded on all packages. Some errors (where the migration
script deleted blank lines and introduced errors) were manually corrected.

The migration process is not perfect, but should handle most of the cases.
Additionally, the evaulation with the TypeScript compiler sets the
[`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop)
option.


## Checking that packages are syntactically valid

Some packages may contain errors, which results in false negatives when we use
them in our evaluation pipeline. To avoid this, we run `tsc` on every package,
and delete the packages that had errors. We do not type check the packages.

    for i in `ls data/original`; do \
        python src/dataset_tools/check_dataset_with_tsc.py \
            --dataset data/original/$i \
            --output data/temp-out; \
    done

This script outputs logs in `data/temp-out`. Packages that are syntactically
valid are represented by a `[package name].out` file, while packages with
errors have the errors logged in `[package name].err`.

If an `es6` package had errors but the original package had no errors, then only
the `es6` package was removed from the dataset.
