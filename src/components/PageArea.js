import React from "react";

const PageArea = ({ content, type, blink }) => {
	return (
		<div className='pageArea'>
			{content.map((character, index) => {
				return (
					<img
						key={index}
						src={character.char}
						style={character.style}
						alt={`${type}-content`}
					/>
				);
			})}
			{blink === type && <div className="blink"></div>}
		</div>
	);
};

export default PageArea;
