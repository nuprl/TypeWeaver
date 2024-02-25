declare namespace _default {
    const test_page: string;
    const frameworks: string;
    namespace launchers {
        namespace Mocha {
            const command: string;
            const protocol: string;
        }
    }
    const launch_in_ci: string[];
    const launch_in_dev: string[];
    namespace browser_args {
        namespace Chrome {
            const mode: string;
            const args: string[];
        }
    }
}
export default _default;
