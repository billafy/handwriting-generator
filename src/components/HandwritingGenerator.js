import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import {
	capitalize,
	getCharacters,
	saveSnapshot,
	getDummyContent,
	getTopOffset,
	randomInt,
} from "../utils/utils";
import { characterList, pages } from "../data/data";
import PageArea from "./PageArea";

let dummyContent = getDummyContent();
const characters = getCharacters();

const HandwritingGenerator = () => {
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

	const updateBlink = (type, stats) => {
		setBlink({
			type,
			position: {
				top: getTopOffset("blink", stats.newLines),
				left: stats.length,
			},
		});
	};

	const getWordWidth = (value, i, index) => {
		let width = 0;
		while (i < value.length) {
			if (value[i] === "\n" || value[i] === " ") break;
			width += widths[value[i++]][index];
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
			const index = char === '\n' || randomInt(0, characters[char].length);
			if (
				![" ", "\n"].includes(char) &&
				[" ", "\n"].includes(newValue[i - 1])
			)
				wordWidth = getWordWidth(newValue, i, index);
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

	const switchPageType = (pageType) => {
		const prevPage = page;
		setPage(backupPage);
		setBackupPage(prevPage);
	};

	useEffect(() => {
		const chars = Object.keys(characters);
		let newWidths = {}, i = 0, j = 0;
		while(i < chars.length) {
			let k = characters[chars[i]].length;
			newWidths[chars[i]] = [];
			while(k > 0) {
				newWidths[chars[i]].push(contentRef.current[j++]);
				--k;
			}
			++i;
		}
		setWidths(newWidths);
	}, []);

	return (
		<div className="container">
			<div className="pageOptions">
				<div>
					<label htmlFor="brightness">Page Brightness</label>
					<input
						type="range"
						name='brightness'
						min={0}
						max={0.5}
						step={0.01}
						value={brightness}
						onChange={({ target: { value } }) =>
							setBrightness(value)
						}
					/>
				</div>
				<div className="selectPageType">
					<label htmlFor="pageType">Page Type</label>
					<select
						value={page.type}
						onChange={({ target: { value } }) =>
							switchPageType(value)
						}
						name="pageType"
					>
						<option value="ruled">Ruled</option>
						<option value="unruled">Unruled</option>
					</select>
				</div>
			</div>
			<div className="main-container">
				<div className="page-container">
					<div
						className="brightness"
						style={{ opacity: brightness }}
					></div>
					<div
						className="page"
						style={{
							...page.pageStyle,
							backgroundImage: `url(/characters/${page.type}.png)`,
						}}
						ref={pageRef}
					>
						{Object.keys(page.content).map((type) => {
							return (
								<PageArea
									content={page.content[type]}
									type={type}
									blink={blink}
									key={type}
								/>
							);
						})}
					</div>
				</div>
				<form>
					<div className="textAreas" style={page.textAreaStyle}>
						{Object.keys(page.input).map((type) => {
							return (
								<textarea
									key={type}
									value={page.input[type]}
									onChange={handleInput}
									onFocus={({ target: { name } }) =>
										updateBlink(name, page.stats[name])
									}
									name={type}
									placeholder={`${capitalize(type)}`}
								/>
							);
						})}
					</div>
					<input
						type="button"
						onClick={() => saveSnapshot(pageRef.current)}
						value="Save"
					/>
				</form>
			</div>
			{dummyContent.length && (
				<PageArea
					content={dummyContent}
					type="dummy"
					blink={false}
					key="dummy"
					contentRef={contentRef}
				/>
			)}
		</div>
	);
};

export default HandwritingGenerator;