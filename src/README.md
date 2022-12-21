# TypeWeaver tools

* `dataset_tools/`: A collection of scripts and tools for building datasets

* `migrate_dataset/main.py`: The script that invokes tools (e.g. type
  prediction, type weaving, type checking) for migrating a dataset from
  JavaScript to TypeScript and type checking the result

* `weaver/`: This tool parses an unannotated JavaScript file and associated CSV
  file containing type predictions, and outputs a valid TypeScript file

* `summarize_results.py`: This script parses the results and error output to
  produce summaries in CSV format

## Dependencies

* Python +3.6 with tqdm
