const createImports: Function = (imports: object, postcss: object, mode: number = "rule") => {
  return Object.keys(imports).map((path: string) => {
    const aliases: object = imports[path];
    const declarations: any[] = Object.keys(aliases).map((key: string) =>
      postcss.decl({
        prop: key,
        value: aliases[key],
        raws: { before: "\n  " },
      })
    );

    const hasDeclarations: boolean = declarations.length > 0;

    const rule: any[] =
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

const createExports: Function = (exports: object, postcss: object, mode: number = "rule") => {
  const declarations: any[] = Object.keys(exports).map((key: string) =>
    postcss.decl({
      prop: key,
      value: exports[key],
      raws: { before: "\n  " },
    })
  );

  if (declarations.length === 0) {
    return [];
  }
  const rule: any[] =
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

const createICSSRules: Function = (imports: any[], exports: string, postcss: string, mode: string) => [
  ...createImports(imports, postcss, mode),
  ...createExports(exports, postcss, mode),
];

export default createICSSRules;
