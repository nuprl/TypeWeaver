module.exports = function typeOf(val: any): any {
  return {}.toString.call(val).slice(8, -1).toLowerCase();
};
