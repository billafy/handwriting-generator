import React, { useState, useEffect, useRef } from "react";
import { pages } from "./data/data";
import { getCharacters, randomInt, getTopOffset } from "./utils/utils";
import { characterList } from "./data/data";

export const AppContext = React.createContext();

const characters = getCharacters();

const AppProvider = ({ children }) => {
	const pageRef = useRef(null);
	const contentRef = useRef([]);
	const [page, setPage] = useState(pages["ruled"]);
	const [blink, setBlink] = useState({
		type: "body",
		position: { top: 3, left: 4 },
	});
	const [widths, setWidths] = useState({});
	const [backupPage, setBackupPage] = useState(pages["unruled"]);
	const [brightness, setBrightness] = useState(0);

	/* updates the page content (what you see on the page image), 
	input (textarea) or 
	stats (length of content and number of new lines)
	*/

	const updatePage = (
		newPage = {
			content: page.content,
			input: page.input,
			stats: page.stats,
		}
	) => {
		setPage((_page) => {
			_page[page.type] = { ..._page[page.type], ...newPage };
			return _page;
		});
	};

	/* calculates the total width taken by the given word 
	value = whole content
	i = index where the width of content will be started measuring
	index = index of the character copy used in the character list
	*/

	const getWordWidth = (value, i, index) => {
		let width = 0;
		while (i < value.length) {
			if (value[i] === "\n" || value[i] === " ") break;
			width += widths[value[i]][index] || widths[value[i]][0];
			++i;
		}
		return width;
	};

	const setNewContent = (newValue, name) => {
		const newContent = [];
		let newLines = 0,
			length = 4,
			_value = "",
			i = 0;
		while (i < newValue.length) {
			const char = newValue[i];
			let wordWidth = 0;
			const index =
				char === "\n" || randomInt(0, characters[char].length);
			if (
				![" ", "\n"].includes(char) &&
				[" ", "\n"].includes(newValue[i - 1])
			)
				wordWidth = getWordWidth(newValue, i, index);
			/* if word is overflowing out of the page area width, shift it to new line */
			if (
				char === "\n" ||
				(length + wordWidth > page.areaLength[name] &&
					Math.ceil(wordWidth) < page.areaLength[name])
			) {
				++newLines;
				length = 4;
				_value += "\n";
			}
			if (characters[char]) {
				newContent.push({
					char: characters[char][index].image,
					style: {
						...characters[char][index].style,
						top: getTopOffset(characters[char][index], newLines),
						left: `${length}px`,
					},
				});
				_value += char;
				length += widths[char][index];
			}
			++i;
		}
		let _content = page.content;
		_content[name] = newContent;
		updatePage({ content: _content, stats: { length, newLines } });
		updateBlink(name, { length, newLines });
		return _value;
	};

	const handleInput = ({ target: { value, name } }) => {
		if (isNaN(widths[" "])) return window.location.reload();
		updatePage({ content: [] });
		let newValue = [...value];
		newValue = newValue.filter(
			(char) => Object.keys(characterList).includes(char) || char === "\n"
		);
		const _value = setNewContent(newValue, name);
		const _input = page.input;
		_input[name] = _value;
		updatePage({ input: _input });
	};

	const updateBlink = (type, stats) => {
		setBlink({
			type,
			position: {
				top: getTopOffset("blink", stats.newLines),
				left: stats.length,
			},
		});
	};

	const switchPageType = (pageType) => {
		const prevPage = page;
		setPage(backupPage);
		setBackupPage(prevPage);
	};

	/* measuring the widths of every character beforehand */
	useEffect(() => {
		const chars = Object.keys(characters);
		let newWidths = {},
			i = 0,
			j = 0;
		while (i < chars.length) {
			let k = characters[chars[i]].length;
			newWidths[chars[i]] = [];
			while (k > 0) {
				newWidths[chars[i]].push(contentRef.current[j++]);
				--k;
			}
			++i;
		}
		setWidths(newWidths);
	}, []);

	return (
		<AppContext.Provider
			value={{
				state: {
					page,
					blink,
					widths,
					backupPage,
					brightness,
				},
				ref: { pageRef, contentRef },
				actions: {
					updateBlink,
					setBrightness,
					switchPageType,
					handleInput,
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;