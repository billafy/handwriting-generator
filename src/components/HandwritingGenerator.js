import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import { getCharacters, saveSnapshot } from "../utils/utils";
import { defaultInput, defaultContent, areaLength } from "../data/data";
import PageArea from "./PageArea";

const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const contentRef = useRef(defaultContent);
	const [input, setInput] = useState(defaultInput);
	const [content, setContent] = useState(defaultContent);
	const [blink, setBlink] = useState("main");

	const getContentLength = (type, index) => {
		let sum = 0;
		contentRef.current[type].forEach((length, i) => {
			if(i <= index) 
				sum += length;
		})
		return sum;
	}

	const getBlankSpaces = (type, index) => {
		return (areaLength[type] - (getContentLength(type, index) % areaLength[type])) / 10.125;
	}

	const setNewContent = (newValue, name) => {
		let newContent = [];
		newValue.forEach((char, index) => {
			if(char === '\n') {
				const blankSpaces = Math.floor(getBlankSpaces(name, index));
				console.log(blankSpaces);
				for(let i = 0; i < blankSpaces; ++i) {
					newContent.push({
						char: characters[' '].image,
						style: characters[' '].style
					})
				}
				return;
			}
			if (!characters[char]) return;
			newContent.push({
				char: characters[char].image,
				style: characters[char].style,
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
		const newValue = [...value];
		setNewContent(newValue, name);
		setInput((_input) => {
			_input[name] = value;
			return _input;
		});
	};

	const f = () => {
		console.log(getContentLength('main'));
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
			<input type="button" onClick={f} value="a" />
		</div>
	);
};

export default HandwritingGenerator;