import typeOf from '../..';

export default function(val): string {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};
