'use strict';

const parsers: any = require('./parsers');

describe('valueType', () => {
  it('returns color for red', () => {
    let input: string = 'red';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for #nnnnnn', () => {
    let input: string = '#fefefe';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgb(n, n, n)', () => {
    let input: string = 'rgb(10, 10, 10)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgb(p, p, p)', () => {
    let input: string = 'rgb(10%, 10%, 10%)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(n, n, n, n)', () => {
    let input: string = 'rgba(10, 10, 10, 1)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(n, n, n, n) with decimal alpha', () => {
    let input: string = 'rgba(10, 10, 10, 0.5)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(p, p, p, n)', () => {
    let input: string = 'rgba(10%, 10%, 10%, 1)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(p, p, p, n) with decimal alpha', () => {
    let input: string = 'rgba(10%, 10%, 10%, 0.5)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns length for 100ch', () => {
    let input: string = '100ch';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.LENGTH);
  });

  it('returns calc from calc(100px * 2)', () => {
    let input: string = 'calc(100px * 2)';
    let output: string = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.CALC);
  });
});
describe('parseInteger', () => {
  it.todo('test');
});
describe('parseNumber', () => {
  it.todo('test');
});
describe('parseLength', () => {
  it.todo('test');
});
describe('parsePercent', () => {
  it.todo('test');
});
describe('parseMeasurement', () => {
  it.todo('test');
});
describe('parseUrl', () => {
  it.todo('test');
});
describe('parseString', () => {
  it.todo('test');
});
describe('parseColor', () => {
  it('should convert hsl to rgb values', () => {
    let input: string = 'hsla(0, 1%, 2%)';
    let output: string = parsers.parseColor(input);

    expect(output).toEqual('rgb(5, 5, 5)');
  });
  it('should convert hsla to rgba values', () => {
    let input: string = 'hsla(0, 1%, 2%, 0.5)';
    let output: string = parsers.parseColor(input);

    expect(output).toEqual('rgba(5, 5, 5, 0.5)');
  });

  it.todo('Add more tests');
});
describe('parseAngle', () => {
  it.todo('test');
});
describe('parseKeyword', () => {
  it.todo('test');
});
describe('dashedToCamelCase', () => {
  it.todo('test');
});
describe('shorthandParser', () => {
  it.todo('test');
});
describe('shorthandSetter', () => {
  it.todo('test');
});
describe('shorthandGetter', () => {
  it.todo('test');
});
describe('implicitSetter', () => {
  it.todo('test');
});
describe('subImplicitSetter', () => {
  it.todo('test');
});
describe('camelToDashed', () => {
  it.todo('test');
});
