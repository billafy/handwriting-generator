import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import characters from "../data/characters";

const HandwritingGenerator = () => {
	const [input, setInput] = useState("");
	const [pageContent, setPageContent] = useState([]);
	const characterRef = useRef([]);

	const handleInput = ({ target: { value } }) => {
		if(input.length === 0 && value === ' ') 
			return;
		if (value.length < input.length) {
			const dif = input.length - value.length;
			setPageContent(pageContent.slice(0, pageContent.length - dif));
			setInput(input.slice(0, input.length - dif));
			return;
		}
		const character = value.at(-1);
		setPageContent([
			...pageContent,
			{
				char: characters[character],
				style: {
					position: "relative",
					top: "62px",
					left: `${
						pageContent.length > 0
							? Number(
									pageContent
										.at(-1)
										.style.left.slice(
											0,
											pageContent.at(-1).style.left
												.length - 3
										)
							  ) + 110
							: 120
					}px`,
				},
			},
		]);
		setInput(value);
	};

	useEffect(() => {
		/* let widths = '';
		characterRef.current.forEach(ref => widths += ' ' + ref.width)
		console.log(widths); */
	}, [characterRef.current.length])

	return (
		<div>
			<div className="page">
				{pageContent.map((character, index) => {
					return (
						<img
							key={index}
							src={character.char}
							style={character.style}
							ref={e => characterRef.current[index] = e}
						/>
					);
				})}
			</div>
			<form>
				<textarea value={input} onChange={handleInput} />
			</form>
		</div>
	);
};

export default HandwritingGenerator;
