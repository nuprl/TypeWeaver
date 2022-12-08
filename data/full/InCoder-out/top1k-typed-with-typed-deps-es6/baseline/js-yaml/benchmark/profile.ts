#!/usr/bin/env node
'use strict';

import fs from 'fs';
import path from 'path';
import yaml from '../';

var data = fs.readFileSync(path.join(__dirname, '/samples/document_nodeca_application.yaml'), 'utf8');

for (var i = 0; i < 10000; i++) {
  yaml.load(data);
}