export default function typeOf(val: String): String {
  return {}.toString.call(val).slice(8, -1).toLowerCase();
};
