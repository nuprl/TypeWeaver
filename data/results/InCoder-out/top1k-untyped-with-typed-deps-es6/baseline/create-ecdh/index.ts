import { createECDH } from 'crypto';

export default createECDH || require('./browser');