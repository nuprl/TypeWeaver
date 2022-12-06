import throat from './index';

const MAX_COUNT: number = 1000000;
const ITERATIONS: number = 10;
const promises: any[] = [];
for (let i = 0; i < MAX_COUNT; i++) {
  promises.push(() => new Promise((resolve: void) => process.nextTick(resolve)));
}

Promise.resolve().then(async () => {
  console.log('limit=10');
  for (let amount = 10; amount <= MAX_COUNT; amount = amount * 10) {
    const list: any[] = promises.slice(0, amount);
    console.time(amount + ' promises');
    for (let i = 0; i < ITERATIONS; i++) {
      await Promise.all(list.map(throat(10, (fn: any) => fn())));
    }
    console.timeEnd(amount + ' promises');
  }
  console.log('limit=1000000');
  for (let amount = 10; amount <= MAX_COUNT; amount = amount * 10) {
    const list: any = promises.slice(0, amount);
    console.time(amount + ' promises');
    for (let i = 0; i < ITERATIONS; i++) {
      await Promise.all(list.map(throat(1000000, (fn: any) => fn())));
    }
    console.timeEnd(amount + ' promises');
  }
});
