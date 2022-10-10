//! This program checks determines if the string that it receives (on stdin) is a
//! syntactically valid TypeScript type, which may be followed by other garbage. If so,
//! it prints the type to stdout (excluding the trailing garbage).
//!
//! Adapted from the example at https://rustdoc.swc.rs/swc_ecma_parser/
use std::io::Read;
use std::process::exit;
use swc_common::sync::Lrc;
use swc_common::{FileName, SourceMap, Spanned};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

fn main() {
    let mut input = String::new();
    std::io::stdin().read_to_string(&mut input).unwrap();
    input = input.trim().to_string();

    let cm: Lrc<SourceMap> = Default::default();

    let input_len = input.len();

    let fm = cm.new_source_file(FileName::Anon, input);

    let string_input = StringInput::from(&*fm);
    let lexer = Lexer::new(
        Syntax::Typescript(Default::default()),
        Default::default(),
        string_input,
        None,
    );

    let mut parser = Parser::new_from(lexer);
    match parser.parse_type() {
        Err(_) => {
            exit(1);
        }
        Ok(typ) => {
            if parser.take_errors().len() != 0 {
                exit(1);
            }
            let hi: usize = typ.span_hi().0.try_into().unwrap();
            let input_prefix = &fm.src[..hi - 1];
            print!("{}", input_prefix.trim());
        }
    }
}
