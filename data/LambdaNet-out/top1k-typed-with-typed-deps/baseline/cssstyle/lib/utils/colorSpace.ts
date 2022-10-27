'use strict';

const hueToRgb: Function = (t1: Number, t2: Number, hue: Number) => {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;

  if (hue < 1) return (t2 - t1) * hue + t1;
  else if (hue < 3) return t2;
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
};

// https://www.w3.org/TR/css-color-4/#hsl-to-rgb
exports.hslToRgb = (hue: Number, sat: Number, light: Number) => {
  const t2: Number = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  const t1: Number = light * 2 - t2;
  const r: Number = hueToRgb(t1, t2, hue + 2);
  const g: Number = hueToRgb(t1, t2, hue);
  const b: Number = hueToRgb(t1, t2, hue - 2);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
