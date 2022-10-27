const createImports: Function = (imports: Object, postcss: Object, mode: Number = "rule") => {
  return Object.keys(imports).map((path: String) => {
    const aliases: Object = imports[path];
    const declarations: Array = Object.keys(aliases).map((key: String) =>
      postcss.decl({
        prop: key,
        value: aliases[key],
        raws: { before: "\n  " },
      })
    );

    const hasDeclarations: Boolean = declarations.length > 0;

    const rule: Array =
      mode === "rule"
        ? postcss.rule({
            selector: `:import('${path}')`,
            raws: { after: hasDeclarations ? "\n" : "" },
          })
        : postcss.atRule({
            name: "icss-import",
            params: `'${path}'`,
            raws: { after: hasDeclarations ? "\n" : "" },
          });

    if (hasDeclarations) {
      rule.append(declarations);
    }

    return rule;
  });
};

const createExports: Function = (exports: Object, postcss: Object, mode: Number = "rule") => {
  const declarations: Array = Object.keys(exports).map((key: String) =>
    postcss.decl({
      prop: key,
      value: exports[key],
      raws: { before: "\n  " },
    })
  );

  if (declarations.length === 0) {
    return [];
  }
  const rule: Array =
    mode === "rule"
      ? postcss.rule({
          selector: `:export`,
          raws: { after: "\n" },
        })
      : postcss.atRule({
          name: "icss-export",
          raws: { after: "\n" },
        });

  rule.append(declarations);

  return [rule];
};

const createICSSRules: Function = (imports: Array, exports: String, postcss: String, mode: String) => [
  ...createImports(imports, postcss, mode),
  ...createExports(exports, postcss, mode),
];

module.exports = createICSSRules;
