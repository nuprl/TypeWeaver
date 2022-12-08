declare const _default: {
    title: string;
    description: string;
    serviceWorker: boolean;
    themeConfig: {
        repo: string;
        docsRepo: string;
        docsDir: string;
        docsBranch: string;
        editLinks: boolean;
        sidebar: {
            "/": {
                title: string;
                collapsable: boolean;
                children: string[];
            }[];
        };
    };
};
export default _default;
