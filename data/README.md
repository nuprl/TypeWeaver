# README

The two datasets, `top1k-typed-with-typed-deps` and
`top1k-untyped-with-typed-deps`, are taken from the `top1k-plus` dataset.

Together, the two datasets represent `top1k-with-typed-deps`, the 137 packages
from the `top1k-plus` dataset that (1) contain code, (2) have at least one
dependency, and (3) have all dependencies contain type definitions in
DefinitelyTyped. Note that this dataset **excludes** packages with zero
dependencies.

The 136 packages are split into the two final datasets:
`top1k-typed-with-typed-deps` are the 94 packages that are themselves typed
(i.e. they contain type definitions in DefinitelyTyped, or include or generate
their own `.d.ts` type definitions) and `top1k-untyped-with-typed-deps` are the
42 packages that do not have type definitions.

Notes: `@babel_runtime` was excluded from the dataset, as it is an extremely
large project. 16 other packages were manually reclassified as typed, while 4
TypeScript packages were removed.

`top1k-typed-with-typed-deps.csv` and `top1k-untyped-with-typed-deps.csv`
contain some basic statistics about the number of lines of JavaScript and
TypeScript code.

## `top1k-plus`

The `top1k-plus` dataset contains the top 1000 most downloaded packages from
NPM, plus additional dependencies to ensure the set is closed. In other words,
all the packages in this dataset either have no dependencies, or depend on a
set of packages that are also in the dataset.

The download stats were scraped from NPM around August 2021. No packages were
filtered out.

There are 1147 packages in this set.

Dependencies were obtained by examining the `package.json` files.
devDependencies and version numbers were ignored.

Using jq (https://stedolan.github.io/jq/), these were the approximate steps:

    ls > pkgs
    for i in `find . -type f -name "package.json"`; do \
        jq -r '.dependencies | keys | join("\n")' $i >> deps; \
    done
    cat deps | sort | uniq > deps_sorted
    diff pkgs deps_sorted | grep ">" | cut -d" " -f2

These steps were repeated until no more new dependencies were discovered.

## `extracted` and `src`

The `extracted` directory contains the packages that were downloaded from NPM
as tarballs, and then extracted. The tarballs were whatever the author uploaded
to NPM, which might not correspond to the package's source code on GitHub. NPM
does not do any validation or curation of the tarballs.

The `src` directory contains the source code of the packages, as downloaded
from GitHub.

The GitHub repository URL was obtained by running:

    npm view [package] repository.url

After cloning the repository, the `.git` directory was deleted to save space.

### Generated `.d.ts` type definitions

Some packages include type annotations in the JSDoc and configure the compiler
to emit `.d.ts` type definitions.

These packages can be found by parsing the `tsconfig.json` files:

    for i in `find . -type f -name "tsconfig.json"`; do \
        jq -e '.compilerOptions.declaration' $i > /dev/null \
            && echo $i | cut -d'/' -f2; \
    done

### Duplicates

Some packages are actually extracted from a larger repository, so it is possible
to download duplicate repositories. For example:

  * `eslint-import-resolver-node` is part of `eslint-plugin-import`
  * `bser` and `fb-watchman` are from `watchman`
