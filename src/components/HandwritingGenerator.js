import React, { useState, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import { getCharacters, saveSnapshot } from "../utils/utils";
import { defaultInput, defaultContent } from "../data/data";
import PageArea from "./PageArea";

const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const [input, setInput] = useState(defaultInput);
	const [pageContent, setPageContent] = useState(defaultContent);
	const [blink, setBlink] = useState("main");

	const appendCharacter = (char, name) => {
		if (!characters[char]) return;
		setPageContent((_pageContent) => {
			_pageContent[name] = [
				..._pageContent[name],
				{
					char: characters[char].image,
					style: characters[char].style,
				},
			];
			return {..._pageContent};
		});
	};

	const handleInput = ({ target: { value, name } }) => {
		setPageContent((_pageContent) => {
			_pageContent[name] = [];
			return {..._pageContent};
		});
		const newValue = [...value];
		newValue.forEach((char) => appendCharacter(char, name));
		setInput(_input => {
			_input[name] = value;
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
				{Object.keys(defaultContent).map((type) => {
					return (
						<PageArea
							content={pageContent[type]}
							type={type}
							blink={blink}
							key={type}
						/>
					);
				})}
			</div>
			<form>
				<div className='textAreas'>
					{Object.keys(defaultInput).map((type) => {
						return (
							<textarea
								key={type}
								value={input[type]}
								onChange={handleInput}
								onFocus={({target: {name}}) => setBlink(name)}
								name={type}
								placeholder={`${type.toUpperCase()}`}
							/>	
						)
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