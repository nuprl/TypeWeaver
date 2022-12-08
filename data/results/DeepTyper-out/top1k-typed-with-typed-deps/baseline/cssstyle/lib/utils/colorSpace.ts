'use strict';

const hueToRgb: number = (t1: number, t2: number, hue: number) => {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;

  if (hue < 1) return (t2 - t1) * hue + t1;
  else if (hue < 3) return t2;
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
};

// https://www.w3.org/TR/css-color-4/#hsl-to-rgb
exports.hslToRgb = (hue: number, sat: number, light: number) => {
  const t2: number = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  const t1: number = light * 2 - t2;
  const r: number = hueToRgb(t1, t2, hue + 2);
  const g: number = hueToRgb(t1, t2, hue);
  const b: number = hueToRgb(t1, t2, hue - 2);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
