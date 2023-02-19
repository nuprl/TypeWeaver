/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords: Function = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords: object = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert: object = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// LAB f(t) constant
const LAB_FT: number = Math.pow(6 / 29, 3);

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb: Promise) {
	const r: number = rgb[0] / 255;
	const g: number = rgb[1] / 255;
	const b: number = rgb[2] / 255;
	const min: number = Math.min(r, g, b);
	const max: number = Math.max(r, g, b);
	const delta: number = max - min;
	let h: number;
	let s: number;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l: number = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb: Promise) {
	let rdif: number;
	let gdif: number;
	let bdif: number;
	let h: number;
	let s: number;

	const r: number = rgb[0] / 255;
	const g: number = rgb[1] / 255;
	const b: number = rgb[2] / 255;
	const v: number = Math.max(r, g, b);
	const diff: number = v - Math.min(r, g, b);
	const diffc: Function = function (c: number) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb: object) {
	const r: number = rgb[0];
	const g: number = rgb[1];
	let b: number = rgb[2];
	const h: string = convert.rgb.hsl(rgb)[0];
	const w: number = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb: Promise) {
	const r: number = rgb[0] / 255;
	const g: number = rgb[1] / 255;
	const b: number = rgb[2] / 255;

	const k: number = Math.min(1 - r, 1 - g, 1 - b);
	const c: number = (1 - r - k) / (1 - k) || 0;
	const m: number = (1 - g - k) / (1 - k) || 0;
	const y: number = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x: Promise, y: Promise): string {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb: string) {
	const reversed: string = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance: number = Infinity;
	let currentClosestKeyword: Function;

	for (const keyword of Object.keys(cssKeywords)) {
		const value: string = cssKeywords[keyword];

		// Compute comparative distance
		const distance: number = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword: string) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb: Promise) {
	let r: number = rgb[0] / 255;
	let g: number = rgb[1] / 255;
	let b: number = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x: number = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375);
	const y: number = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175);
	const z: number = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb: string) {
	const xyz: object = convert.rgb.xyz(rgb);
	let x: number = xyz[0];
	let y: number = xyz[1];
	let z: number = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l: number = (116 * y) - 16;
	const a: number = 500 * (x - y);
	const b: number = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl: Promise) {
	const h: number = hsl[0] / 360;
	const s: number = hsl[1] / 100;
	const l: number = hsl[2] / 100;
	let t2: number;
	let t3: number;
	let val: number;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1: number = 2 * l - t2;

	const rgb: object = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl: Promise) {
	const h: string = hsl[0];
	let s: number = hsl[1] / 100;
	let l: number = hsl[2] / 100;
	let smin: number = s;
	const lmin: number = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v: number = (l + s) / 2;
	const sv: number = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv: Promise) {
	const h: number = hsv[0] / 60;
	const s: number = hsv[1] / 100;
	let v: number = hsv[2] / 100;
	const hi: number = Math.floor(h) % 6;

	const f: number = h - Math.floor(h);
	const p: number = 255 * v * (1 - s);
	const q: number = 255 * v * (1 - (s * f));
	const t: number = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv: Promise) {
	const h: string = hsv[0];
	const s: number = hsv[1] / 100;
	const v: number = hsv[2] / 100;
	const vmin: number = Math.max(v, 0.01);
	let sl: number;
	let l: number;

	l = (2 - s) * v;
	const lmin: number = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb: Promise) {
	const h: number = hwb[0] / 360;
	let wh: number = hwb[1] / 100;
	let bl: number = hwb[2] / 100;
	const ratio: number = wh + bl;
	let f: number;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i: number = Math.floor(6 * h);
	const v: number = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n: number = wh + f * (v - wh); // Linear interpolation

	let r: number;
	let g: number;
	let b: number;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk: Promise) {
	const c: number = cmyk[0] / 100;
	const m: number = cmyk[1] / 100;
	const y: number = cmyk[2] / 100;
	const k: number = cmyk[3] / 100;

	const r: number = 1 - Math.min(1, c * (1 - k) + k);
	const g: number = 1 - Math.min(1, m * (1 - k) + k);
	const b: number = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz: Promise) {
	const x: number = xyz[0] / 100;
	const y: number = xyz[1] / 100;
	const z: number = xyz[2] / 100;
	let r: number;
	let g: number;
	let b: number;

	r = (x * 3.2404542) + (y * -1.5371385) + (z * -0.4985314);
	g = (x * -0.969266) + (y * 1.8760108) + (z * 0.041556);
	b = (x * 0.0556434) + (y * -0.2040259) + (z * 1.0572252);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz: Promise) {
	let x: number = xyz[0];
	let y: number = xyz[1];
	let z: number = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l: number = (116 * y) - 16;
	const a: number = 500 * (x - y);
	const b: number = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab: Promise) {
	const l: string = lab[0];
	const a: number = lab[1];
	const b: number = lab[2];
	let x: number;
	let y: number;
	let z: number;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2: number = y ** 3;
	const x2: number = x ** 3;
	const z2: number = z ** 3;
	y = y2 > LAB_FT ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > LAB_FT ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > LAB_FT ? z2 : (z - 16 / 116) / 7.787;

	// Illuminant D65 XYZ Tristrimulus Values
	// https://en.wikipedia.org/wiki/CIE_1931_color_space
	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab: Promise) {
	const l: string = lab[0];
	const a: number = lab[1];
	const b: number = lab[2];
	let h: number;

	const hr: number = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c: number = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch: Promise) {
	const l: string = lch[0];
	const c: number = lch[1];
	const h: number = lch[2];

	const hr: number = h / 360 * 2 * Math.PI;
	const a: number = c * Math.cos(hr);
	const b: number = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args: any[], saturation: number = null) {
	const [r, g, b] = args;
	let value: number = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi: number = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args: object) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args: Promise) {
	const r: number = args[0];
	const g: number = args[1];
	const b: number = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi: number = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args: number) {
	args = args[0];

	let color: number = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult: number = (~~(args > 50) + 1) * 0.5;
	const r: number = ((color & 1) * mult) * 255;
	const g: number = (((color >> 1) & 1) * mult) * 255;
	const b: number = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args: number) {
	args = args[0];

	// Handle greyscale
	if (args >= 232) {
		const c: string = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem: number;
	const r: number = Math.floor(args / 36) / 5 * 255;
	const g: number = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b: number = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args: Promise) {
	const integer: string = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string: string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args: string) {
	const match: object = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString: string = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map((char: number) => {
			return char + char;
		}).join('');
	}

	const integer: number = parseInt(colorString, 16);
	const r: number = (integer >> 16) & 0xFF;
	const g: number = (integer >> 8) & 0xFF;
	const b: number = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb: Promise) {
	const r: number = rgb[0] / 255;
	const g: number = rgb[1] / 255;
	const b: number = rgb[2] / 255;
	const max: number = Math.max(Math.max(r, g), b);
	const min: number = Math.min(Math.min(r, g), b);
	const chroma: number = (max - min);
	let grayscale: number;
	let hue: number;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl: Promise) {
	const s: number = hsl[1] / 100;
	const l: number = hsl[2] / 100;

	const c: number = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f: number = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv: Promise) {
	const s: number = hsv[1] / 100;
	const v: number = hsv[2] / 100;

	const c: number = s * v;
	let f: number = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg: Promise) {
	const h: number = hcg[0] / 360;
	const c: number = hcg[1] / 100;
	const g: number = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure: object = [0, 0, 0];
	const hi: number = (h % 1) * 6;
	const v: number = hi % 1;
	const w: number = 1 - v;
	let mg: number = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg: Promise) {
	const c: number = hcg[1] / 100;
	const g: number = hcg[2] / 100;

	const v: number = c + g * (1.0 - c);
	let f: number = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg: Promise) {
	const c: number = hcg[1] / 100;
	const g: number = hcg[2] / 100;

	const l: number = g * (1.0 - c) + 0.5 * c;
	let s: number = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg: Promise) {
	const c: number = hcg[1] / 100;
	const g: number = hcg[2] / 100;
	const v: number = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb: Promise) {
	const w: number = hwb[1] / 100;
	const b: number = hwb[2] / 100;
	const v: number = 1 - b;
	const c: number = v - w;
	let g: number = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple: Promise) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb: Promise) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args: Promise) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args: Promise) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray: Promise) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray: Promise) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray: Promise) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray: Promise) {
	const val: number = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer: string = (val << 16) + (val << 8) + val;

	const string: string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb: Promise) {
	const val: number = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
