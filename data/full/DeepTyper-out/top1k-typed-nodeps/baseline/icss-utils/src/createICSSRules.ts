const createImports: any = (imports, postcss, mode = "rule") => {
  return Object.keys(imports).map((path: string) => {
    const aliases: any = imports[path];
    const declarations: any = Object.keys(aliases).map((key: string) =>
      postcss.decl({
        prop: key,
        value: aliases[key],
        raws: { before: "\n  " },
      })
    );

    const hasDeclarations: boolean = declarations.length > 0;

    const rule: any =
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

const createExports: any = (exports, postcss, mode = "rule") => {
  const declarations: any = Object.keys(exports).map((key: string) =>
    postcss.decl({
      prop: key,
      value: exports[key],
      raws: { before: "\n  " },
    })
  );

  if (declarations.length === 0) {
    return [];
  }
  const rule: any =
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

const createICSSRules: void = (imports: any, exports: any, postcss: any, mode: any) => [
  ...createImports(imports, postcss, mode),
  ...createExports(exports, postcss, mode),
];

module.exports = createICSSRules;
