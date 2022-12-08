import typeOf from '../..';

export default function(val: any) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};