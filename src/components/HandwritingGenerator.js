import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import {
	capitalize,
	getCharacters,
	saveSnapshot,
	getDummyContent,
	getTopOffset,
} from "../utils/utils";
import {
	characterList, 
	defaultInput,
	defaultContent,
	areaLength,
	defaultStats,
} from "../data/data";
import PageArea from "./PageArea";

let dummyContent = getDummyContent();
const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const contentRef = useRef([]);
	const [input, setInput] = useState(defaultInput);
	const [content, setContent] = useState(defaultContent);
	const [blink, setBlink] = useState({
		type: "body",
		position: { top: 3, left: 4 },
	});
	const [widths, setWidths] = useState({});
	const [contentStats, setContentStats] = useState(defaultStats);

	const updateContent = (type, newContent) => {
		setContent((_content) => {
			_content[type] = newContent;
			return _content;
		});
	}

	const updateBlink = (type, stats) => {
		setBlink({
			type,
			position: {
				top: getTopOffset("blink", stats.newLines),
				left: stats.length,
			},
		});
	};

	const setNewContent = (newValue, name) => {
		if(isNaN(widths[' '])) 
			window.location.reload()
		const newContent = [];
		let newLines = 0,
			length = 4;
		newValue.forEach((char, index) => {
			if (char === "\n" || length + widths[char] > areaLength[name]) {
				++newLines;
				length = 4;
			}
			if (!characters[char]) return;
			newContent.push({
				char: characters[char].image,
				style: {
					...characters[char].style,
					top: getTopOffset(characters[char], newLines),
					left: `${length}px`,
				},
			});
			length += widths[char];
		});
		setContentStats(_contentStats => {
			_contentStats[name] = {length, newLines};
			return _contentStats;
		})
		updateContent(name, newContent);
		updateBlink(name, {length, newLines});
	};

	const handleInput = ({ target: { value, name } }) => {
		updateContent(name, []);
		let newValue = [...value];
		newValue = newValue.filter(
			(char) => Object.keys(characterList).includes(char) || char === "\n"
		);
		setNewContent(newValue, name);
		setInput((_input) => {
			_input[name] = newValue.join("");
			return _input;
		});
	};

	useEffect(() => {
		let newWidths = {};
		Object.keys(characters).forEach((char, i) => {
			newWidths[char] = contentRef.current[i];
		});
		setWidths(newWidths);
	}, []);

	return (
		<div className="container">
			<div
				className="page"
				style={{ backgroundImage: "url(/alphabets/page.png)" }}
				ref={pageRef}
			>
				{Object.keys(defaultContent).map((type, index) => {
					return (
						<PageArea
							content={content[type]}
							type={type}
							blink={blink}
							key={type}
						/>
					);
				})}
			</div>
			<form>
				<div className="textAreas">
					{Object.keys(defaultInput).map((type) => {
						return (
							<textarea
								key={type}
								value={input[type]}
								onChange={handleInput}
								onFocus={({target: {name}}) => updateBlink(name, contentStats[name])}
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