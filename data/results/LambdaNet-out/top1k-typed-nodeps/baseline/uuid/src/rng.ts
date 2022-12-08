import crypto from 'crypto';

const rnds8Pool: any[] = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr: number = rnds8Pool.length;

export default function rng(): string {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
