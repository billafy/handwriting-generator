import React, { useState, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import { getCharacters, saveSnapshot } from "../utils/utils";
import characterList, { defaultInput, defaultContent } from "../data/data";
import PageArea from "./PageArea";

const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const contentRef = useRef(defaultContent);
	const [input, setInput] = useState(defaultInput);
	const [content, setContent] = useState(defaultContent);
	const [blink, setBlink] = useState("main");

	const getTopOffset = (char, newLines) => {
		const top = Number(char.style.top.slice(0, char.style.top.length - 2));
		return `${newLines * 19.5 + top}px`;
	};

	const setNewContent = (newValue, name) => {
		const newContent = [];
		let newLines = 0;
		newValue.forEach((char, index) => {
			if (char === "\n") ++newLines;
			if (!characters[char]) return;
			newContent.push({
				char: characters[char].image,
				style: {
					...characters[char].style,
					top: getTopOffset(characters[char], newLines),
				},
			});
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
							contentRef={contentRef}
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
								placeholder={`${type.toUpperCase()}`}
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
	);
};

export default HandwritingGenerator;
