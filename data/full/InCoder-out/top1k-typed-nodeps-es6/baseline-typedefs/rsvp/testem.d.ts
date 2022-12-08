declare const _default: {
    test_page: string;
    frameworks: string;
    launchers: {
        Mocha: {
            command: string;
            protocol: string;
        };
    };
    launch_in_ci: string[];
    launch_in_dev: string[];
    browser_args: {
        Chrome: {
            mode: string;
            args: string[];
        };
    };
};
export default _default;
