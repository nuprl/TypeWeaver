import typeOf from '../..';

export default function(val: String) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};
