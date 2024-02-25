export default ansiStyles;
declare namespace ansiStyles {
    namespace modifier {
        const reset: number[];
        const bold: number[];
        const dim: number[];
        const italic: number[];
        const underline: number[];
        const overline: number[];
        const inverse: number[];
        const hidden: number[];
        const strikethrough: number[];
    }
    namespace color {
        const black: number[];
        const red: number[];
        const green: number[];
        const yellow: number[];
        const blue: number[];
        const magenta: number[];
        const cyan: number[];
        const white: number[];
        const blackBright: number[];
        const redBright: number[];
        const greenBright: number[];
        const yellowBright: number[];
        const blueBright: number[];
        const magentaBright: number[];
        const cyanBright: number[];
        const whiteBright: number[];
    }
    namespace bgColor {
        const bgBlack: number[];
        const bgRed: number[];
        const bgGreen: number[];
        const bgYellow: number[];
        const bgBlue: number[];
        const bgMagenta: number[];
        const bgCyan: number[];
        const bgWhite: number[];
        const bgBlackBright: number[];
        const bgRedBright: number[];
        const bgGreenBright: number[];
        const bgYellowBright: number[];
        const bgBlueBright: number[];
        const bgMagentaBright: number[];
        const bgCyanBright: number[];
        const bgWhiteBright: number[];
    }
}
