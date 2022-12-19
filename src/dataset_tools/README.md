# dataset_tools

A collection of scripts and tools for building datasets.

These are ad-hoc scripts written to automate tasks, and have not been tested for
reusability. Nevertheless, they may still be helpful.

* `check_dataset_in_definitely_typed.py`: checks a JavaScript dataset against
  the DefinitelyTyped repository, to determine if the package and its
  dependencies have type definitions in DefinitelyTyped

* `collect_dataset_stats.py`: collects statistics (e.g. number of dependencies,
  lines of code) and reports for each package

* `download_pkg_src_from_github.py`: takes a JavaScript dataset and downloads
  package source code from GitHub

* `install_dependency_type_defs.py`: takes a JavaScript dataset and installs
  type definitions for each package's dependencies

* `save_ground_truth_typings.py`: given a JavaScript dataset, copies the `.d.ts`
  type definitions from the provided DefinitelyTyped directory; if no type
  definitions exist, checks the package to see if type definitions were bundled

* `transform_require_to_import.py`: transforms a JavaScript dataset from
  CommonJS modules to ECMAScript 6 modules

`util.py` contains some common utility functions.

## Dependencies

* Python +3.6 with tqdm
* Node +16
* cloc
* git

Install NPM dependencies:

    npm install
