export default function typeOf(val: string): string {
  return {}.toString.call(val).slice(8, -1).toLowerCase();
};
