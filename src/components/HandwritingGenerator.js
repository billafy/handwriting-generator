import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import { capitalize, getCharacters, saveSnapshot, getDummyContent } from "../utils/utils";
import characterList, { defaultInput, defaultContent } from "../data/data";
import PageArea from "./PageArea";

const dummyContent = getDummyContent();
const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const contentRef = useRef([]);
	const [input, setInput] = useState(defaultInput);
	const [content, setContent] = useState(defaultContent);
	const [blink, setBlink] = useState("main");
	const [widths, setWidths] = useState({});

	const getTopOffset = (char, newLines) => {
		const top = Number(char.style.top.slice(0, char.style.top.length - 2));
		return `${newLines * 19.5 + top}px`;
	};

	const getLeftOffsets = (newValue) => {
		let leftOffsets = [0], newLine = false, length = widths[newValue[0]] || 0, lineLength = 0;
		for(let i = 1; i < newValue.length; ++i) {
			if(newValue[i] === '\n') {
				lineLength = 0;
				newLine = true;
				continue;
			}
			if(!newLine) 
				leftOffsets.push(0);
			else 
				leftOffsets.push(0 - length + lineLength);
			length += widths[newValue[i]];
			length %= 417;	
			lineLength += widths[newValue[i]];
		}
		return leftOffsets;
	}                                                                                

	const setNewContent = (newValue, name) => {
		const newContent = [], leftOffsets = getLeftOffsets(newValue);
		let newLines = 0, i = 0;
		newValue.forEach((char, index) => {
			if (char === "\n") ++newLines;
			if (!characters[char]) return;
			newContent.push({
				char: characters[char].image,
				style: {
					...characters[char].style,
					top: getTopOffset(characters[char], newLines),
					left: leftOffsets[i],
				},
			});
			++i;
		});
		setContent((_content) => {
			_content[name] = newContent;
			return _content;
		});
	};

	const handleInput = ({ target: { value, name } }) => {
		setContent((_content) => {
			_content[name] = [];
			return { ..._content };
		});
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

	const f = () => {};

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
								onFocus={({ target: { name } }) =>
									setBlink(name)
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
			<input type="button" onClick={f} />
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
