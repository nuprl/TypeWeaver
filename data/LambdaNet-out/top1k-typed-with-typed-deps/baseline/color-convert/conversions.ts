/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords: Function = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords: Object = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert: Object = {
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
const LAB_FT: Number = Math.pow(6 / 29, 3);

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
	const r: Number = rgb[0] / 255;
	const g: Number = rgb[1] / 255;
	const b: Number = rgb[2] / 255;
	const min: Number = Math.min(r, g, b);
	const max: Number = Math.max(r, g, b);
	const delta: Number = max - min;
	let h: Number;
	let s: Number;

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

	const l: Number = (min + max) / 2;

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
	let rdif: Number;
	let gdif: Number;
	let bdif: Number;
	let h: Number;
	let s: Number;

	const r: Number = rgb[0] / 255;
	const g: Number = rgb[1] / 255;
	const b: Number = rgb[2] / 255;
	const v: Number = Math.max(r, g, b);
	const diff: Number = v - Math.min(r, g, b);
	const diffc: Function = function (c: Number) {
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

convert.rgb.hwb = function (rgb: Object) {
	const r: Number = rgb[0];
	const g: Number = rgb[1];
	let b: Number = rgb[2];
	const h: String = convert.rgb.hsl(rgb)[0];
	const w: Number = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb: Promise) {
	const r: Number = rgb[0] / 255;
	const g: Number = rgb[1] / 255;
	const b: Number = rgb[2] / 255;

	const k: Number = Math.min(1 - r, 1 - g, 1 - b);
	const c: Number = (1 - r - k) / (1 - k) || 0;
	const m: Number = (1 - g - k) / (1 - k) || 0;
	const y: Number = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x: Promise, y: Promise): String {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb: String) {
	const reversed: String = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance: Number = Infinity;
	let currentClosestKeyword: Function;

	for (const keyword of Object.keys(cssKeywords)) {
		const value: String = cssKeywords[keyword];

		// Compute comparative distance
		const distance: Number = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword: String) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb: Promise) {
	let r: Number = rgb[0] / 255;
	let g: Number = rgb[1] / 255;
	let b: Number = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x: Number = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375);
	const y: Number = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175);
	const z: Number = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb: String) {
	const xyz: Object = convert.rgb.xyz(rgb);
	let x: Number = xyz[0];
	let y: Number = xyz[1];
	let z: Number = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l: Number = (116 * y) - 16;
	const a: Number = 500 * (x - y);
	const b: Number = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl: Promise) {
	const h: Number = hsl[0] / 360;
	const s: Number = hsl[1] / 100;
	const l: Number = hsl[2] / 100;
	let t2: Number;
	let t3: Number;
	let val: Number;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1: Number = 2 * l - t2;

	const rgb: Object = [0, 0, 0];
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
	const h: String = hsl[0];
	let s: Number = hsl[1] / 100;
	let l: Number = hsl[2] / 100;
	let smin: Number = s;
	const lmin: Number = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v: Number = (l + s) / 2;
	const sv: Number = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv: Promise) {
	const h: Number = hsv[0] / 60;
	const s: Number = hsv[1] / 100;
	let v: Number = hsv[2] / 100;
	const hi: Number = Math.floor(h) % 6;

	const f: Number = h - Math.floor(h);
	const p: Number = 255 * v * (1 - s);
	const q: Number = 255 * v * (1 - (s * f));
	const t: Number = 255 * v * (1 - (s * (1 - f)));
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
	const h: String = hsv[0];
	const s: Number = hsv[1] / 100;
	const v: Number = hsv[2] / 100;
	const vmin: Number = Math.max(v, 0.01);
	let sl: Number;
	let l: Number;

	l = (2 - s) * v;
	const lmin: Number = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb: Promise) {
	const h: Number = hwb[0] / 360;
	let wh: Number = hwb[1] / 100;
	let bl: Number = hwb[2] / 100;
	const ratio: Number = wh + bl;
	let f: Number;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i: Number = Math.floor(6 * h);
	const v: Number = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n: Number = wh + f * (v - wh); // Linear interpolation

	let r: Number;
	let g: Number;
	let b: Number;
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
	const c: Number = cmyk[0] / 100;
	const m: Number = cmyk[1] / 100;
	const y: Number = cmyk[2] / 100;
	const k: Number = cmyk[3] / 100;

	const r: Number = 1 - Math.min(1, c * (1 - k) + k);
	const g: Number = 1 - Math.min(1, m * (1 - k) + k);
	const b: Number = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz: Promise) {
	const x: Number = xyz[0] / 100;
	const y: Number = xyz[1] / 100;
	const z: Number = xyz[2] / 100;
	let r: Number;
	let g: Number;
	let b: Number;

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
	let x: Number = xyz[0];
	let y: Number = xyz[1];
	let z: Number = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l: Number = (116 * y) - 16;
	const a: Number = 500 * (x - y);
	const b: Number = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab: Promise) {
	const l: String = lab[0];
	const a: Number = lab[1];
	const b: Number = lab[2];
	let x: Number;
	let y: Number;
	let z: Number;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2: Number = y ** 3;
	const x2: Number = x ** 3;
	const z2: Number = z ** 3;
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
	const l: String = lab[0];
	const a: Number = lab[1];
	const b: Number = lab[2];
	let h: Number;

	const hr: Number = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c: Number = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch: Promise) {
	const l: String = lch[0];
	const c: Number = lch[1];
	const h: Number = lch[2];

	const hr: Number = h / 360 * 2 * Math.PI;
	const a: Number = c * Math.cos(hr);
	const b: Number = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args: Array, saturation: Number = null) {
	const [r, g, b] = args;
	let value: Number = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi: Number = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args: Object) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args: Promise) {
	const r: Number = args[0];
	const g: Number = args[1];
	const b: Number = args[2];

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

	const ansi: Number = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args: Number) {
	args = args[0];

	let color: Number = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult: Number = (~~(args > 50) + 1) * 0.5;
	const r: Number = ((color & 1) * mult) * 255;
	const g: Number = (((color >> 1) & 1) * mult) * 255;
	const b: Number = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args: Number) {
	args = args[0];

	// Handle greyscale
	if (args >= 232) {
		const c: String = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem: Number;
	const r: Number = Math.floor(args / 36) / 5 * 255;
	const g: Number = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b: Number = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args: Promise) {
	const integer: String = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string: String = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args: String) {
	const match: Object = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString: String = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map((char: Number) => {
			return char + char;
		}).join('');
	}

	const integer: Number = parseInt(colorString, 16);
	const r: Number = (integer >> 16) & 0xFF;
	const g: Number = (integer >> 8) & 0xFF;
	const b: Number = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb: Promise) {
	const r: Number = rgb[0] / 255;
	const g: Number = rgb[1] / 255;
	const b: Number = rgb[2] / 255;
	const max: Number = Math.max(Math.max(r, g), b);
	const min: Number = Math.min(Math.min(r, g), b);
	const chroma: Number = (max - min);
	let grayscale: Number;
	let hue: Number;

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
	const s: Number = hsl[1] / 100;
	const l: Number = hsl[2] / 100;

	const c: Number = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f: Number = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv: Promise) {
	const s: Number = hsv[1] / 100;
	const v: Number = hsv[2] / 100;

	const c: Number = s * v;
	let f: Number = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg: Promise) {
	const h: Number = hcg[0] / 360;
	const c: Number = hcg[1] / 100;
	const g: Number = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure: Object = [0, 0, 0];
	const hi: Number = (h % 1) * 6;
	const v: Number = hi % 1;
	const w: Number = 1 - v;
	let mg: Number = 0;

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
	const c: Number = hcg[1] / 100;
	const g: Number = hcg[2] / 100;

	const v: Number = c + g * (1.0 - c);
	let f: Number = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg: Promise) {
	const c: Number = hcg[1] / 100;
	const g: Number = hcg[2] / 100;

	const l: Number = g * (1.0 - c) + 0.5 * c;
	let s: Number = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg: Promise) {
	const c: Number = hcg[1] / 100;
	const g: Number = hcg[2] / 100;
	const v: Number = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb: Promise) {
	const w: Number = hwb[1] / 100;
	const b: Number = hwb[2] / 100;
	const v: Number = 1 - b;
	const c: Number = v - w;
	let g: Number = 0;

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
	const val: Number = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer: String = (val << 16) + (val << 8) + val;

	const string: String = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb: Promise) {
	const val: Number = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
