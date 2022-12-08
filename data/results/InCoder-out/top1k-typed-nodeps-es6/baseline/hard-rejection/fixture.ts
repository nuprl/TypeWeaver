'use strict';
import hardRejection from '.';

hardRejection();

Promise.reject(new Error('Unicorn'));