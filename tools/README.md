# tools

A collection of scripts and tools.

* `check_dataset_in_definitely_typed.py`: checks a JavaScript dataset against
  the DefinitelyTyped repository, to determine if the package and its
  dependencies have type definitions in DefinitelyTyped

* `collect_dataset_stats.py`: collects statistics (e.g. number of dependencies,
  lines of code) and reports for each package

* `download_pkg_src_from_github.py`: takes a JavaScript dataset and downloads
  package source code from GitHub

* `install_dependency_type_defs.py`: takes a JavaScript dataset and installs
  type definitions for each package's dependencies

* `run_migration_pipeline/main.py`: runs the evaluation pipeline (inference,
  type weaving, and type checking) on a dataset

* `transform_require_to_import.py`: transforms a JavaScript dataset from
  CommonJS modules to ECMAScript 6 modules

* `type_weaver/index.ts`: weaves an unannotated JavaScript file with a CSV file
  of type predictions, to produce a type annotated TypeScript file

`util.py` contains some common utility functions.

## Dependencies

* Python 3.6.15
* Node 16.15.0

Install NPM dependencies:

    npm install
