import docsUrl from '../docsUrl';

function isNonExportStatement({ type }) {
  return type !== 'ExportDefaultDeclaration' &&
    type !== 'ExportNamedDeclaration' &&
    type !== 'ExportAllDeclaration';
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      url: docsUrl('exports-last'),
    },
    schema: [],
  },

  create(context) {
    return {
      Program({ body }) {
        const lastNonExportStatementIndex = body.reduce(function findLastIndex(acc, item, index) {
          if (isNonExportStatement(item)) {
            return index;
          }
          return acc;
        }, -1);

        if (lastNonExportStatementIndex !== -1) {
          body.slice(0, lastNonExportStatementIndex).forEach(function checkNonExport(node) {
            if (!isNonExportStatement(node)) {
              context.report({
                node,
                message: 'Export statements should appear at the end of the file',
              });
            }
          });
        }
      },
    };
  },
};
