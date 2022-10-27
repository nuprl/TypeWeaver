'use strict';

import repeating from 'repeating';

export default function(str: number, num): string {
  return repeating(num, str);
};
