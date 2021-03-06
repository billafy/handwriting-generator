export const characterList = {
	a: { filename: "a-sm", copies: 4 },
	b: { filename: "b-sm", copies: 4 },
	c: { filename: "c-sm", copies: 4 },
	d: { filename: "d-sm", copies: 4 },
	e: { filename: "e-sm", copies: 4 },
	f: { filename: "f-sm", copies: 4 },
	g: { filename: "g-sm", topOffset: 7, copies: 4 },
	h: { filename: "h-sm", copies: 4 },
	i: { filename: "i-sm", copies: 4 },
	j: { filename: "j-sm", topOffset: 5, copies: 4 },
	k: { filename: "k-sm", copies: 4 },
	l: { filename: "l-sm", copies: 4 },
	m: { filename: "m-sm", copies: 4 },
	n: { filename: "n-sm", copies: 4 },
	o: { filename: "o-sm", copies: 4 },
	p: { filename: "p-sm", topOffset: 7, copies: 4 },
	q: { filename: "q-sm", topOffset: 7, copies: 4 },
	r: { filename: "r-sm", copies: 4 },
	s: { filename: "s-sm", copies: 4 },
	t: { filename: "t-sm", copies: 4 },
	u: { filename: "u-sm", copies: 4 },
	v: { filename: "v-sm", copies: 4 },
	w: { filename: "w-sm", copies: 4 },
	x: { filename: "x-sm", copies: 4 },
	y: { filename: "y-sm", topOffset: 7, copies: 4 },
	z: { filename: "z-sm", copies: 4 },
	A: { filename: "a-bg", copies: 4 },
	B: { filename: "b-bg", copies: 4 },
	C: { filename: "c-bg", copies: 4 },
	D: { filename: "d-bg", copies: 4 },
	E: { filename: "e-bg", copies: 4 },
	F: { filename: "f-bg", copies: 4 },
	G: { filename: "g-bg", copies: 4 },
	H: { filename: "h-bg", copies: 4 },
	I: { filename: "i-bg", copies: 4 },
	J: { filename: "j-bg", copies: 4 },
	K: { filename: "k-bg", copies: 4 },
	L: { filename: "l-bg", copies: 4 },
	M: { filename: "m-bg", copies: 4 },
	N: { filename: "n-bg", copies: 4 },
	O: { filename: "o-bg", copies: 4 },
	P: { filename: "p-bg", copies: 4 },
	Q: { filename: "q-bg", copies: 4 },
	R: { filename: "r-bg", copies: 4 },
	S: { filename: "s-bg", copies: 4 },
	T: { filename: "t-bg", copies: 4 },
	U: { filename: "u-bg", copies: 4 },
	V: { filename: "v-bg", copies: 4 },
	W: { filename: "w-bg", copies: 4 },
	X: { filename: "x-bg", copies: 4 },
	Y: { filename: "y-bg", copies: 4 },
	Z: { filename: "z-bg", copies: 4 },
	0: { filename: "0", copies: 4 },
	1: { filename: "1", copies: 4 },
	2: { filename: "2", copies: 4 },
	3: { filename: "3", copies: 4 },
	4: { filename: "4", copies: 4 },
	5: { filename: "5", copies: 4 },
	6: { filename: "6", copies: 4 },
	7: { filename: "7", copies: 4 },
	8: { filename: "8", copies: 4 },
	9: { filename: "9", copies: 4 },
	" ": { filename: "blankspace", copies: 1 },
	".": { filename: "fullstop", copies: 1 },
	"(": { filename: "(", copies: 1 },
	")": { filename: ")", copies: 1 },
	":": { filename: "colon", copies: 1 },
	"!": { filename: "!", copies: 1 },
	"#": { filename: "hash", copies: 1 },
	"^": { filename: "^", copies: 1 },
	"*": { filename: "asterisk", copies: 1 },
	"-": { filename: "hyphen", copies: 1 },
	"+": { filename: "plus", copies: 1 },
	"=": { filename: "equal", copies: 1 },
	"|": { filename: "or", copies: 1 },
	"\\": { filename: "backslash", copies: 1 },
	"/": { filename: "forwardslash", copies: 1 },
	"{": { filename: "{", copies: 1 },
	"}": { filename: "}", copies: 1 },
	"[": { filename: "[", copies: 1 },
	"]": { filename: "]", copies: 1 },
	'"': { filename: "quotes", copies: 1 },
	"'": { filename: "'", copies: 1 },
	"<": { filename: "lt", copies: 1 },
	">": { filename: "gt", copies: 1 },
	",": { filename: ",", topOffset: 3, copies: 1 },
	"~": { filename: "~", copies: 1 },
	"`": { filename: "`", copies: 1 },
	$: { filename: "$", copies: 1 },
	"@": { filename: "@", copies: 1 },
	"&": { filename: "&", copies: 1 },
	"%": { filename: "percentage", copies: 1 },
	"?": { filename: "question", copies: 1 },
};

export const pages = {
	ruled: {
		type: "ruled",
		content: {
			topRight: [],
			title: [],
			margin: [],
			body: [],
		},
		input: {
			topRight: "",
			title: "",
			margin: "",
			body: "",
		},
		areaLength: {
			topRight: 62,
			title: 417,
			margin: 62,
			body: 417,
		},
		stats: {
			topRight: { length: 4, newLines: 0 },
			title: { length: 4, newLines: 0 },
			margin: { length: 4, newLines: 0 },
			body: { length: 4, newLines: 0 },
		},
		pageStyle: {
			gridTemplateColumns: "70px 425px",
			gridTemplateRows: "70px 632px",
		},
		textAreaStyle: {
			gridTemplateColumns: "20% 80%",
			gridTemplateRows: "15% 85%",
		},
	},
	unruled: {
		type: "unruled",
		content: {
			body: [],
		},
		input: {
			body: "",
		},
		areaLength: {
			body: 484,
		},
		stats: {
			body: { length: 4, newLines: 0 },
		},
		pageStyle: {
			gridTemplateColumns: "484px",
			gridTemplateRows: "685.5px",
			padding: "8px",
		},
		textAreaStyle: {
			gridTemplateColumns: "1fr",
			gridTemplateRows: "1fr",
		},
	},
};