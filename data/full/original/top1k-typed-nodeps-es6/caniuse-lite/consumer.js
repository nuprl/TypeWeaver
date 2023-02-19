'use strict'

import features from './data/features';
import lite from './dist/unpacker';

Object.keys(features).forEach(key => {
  let feat = features[key]
  console.log(key, lite.feature(feat))
})
