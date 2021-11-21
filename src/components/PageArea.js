import React from "react";

const PageArea = ({ content, type, blink, contentRef}) => {
	const setWidth = (element, index) => {
		if (!element) contentRef.current[type][index] = 0;
		else 
			contentRef.current[type][index] = 1 + element.getBoundingClientRect().width;
	};

	return (
		<div className="pageArea">
			{content.map((character, index) => {
				if(!character || !character.char || !character.style) 
					return <React.Fragment key={index}></React.Fragment>
				return (
					<img
						key={index}
						src={character.char}
						style={character.style}
						alt={`${type}-content`}
						ref={(element) => setWidth(element, index)}
					/>
				);
			})}
			{blink === type && <div className="blink"></div>}
		</div>
	);
};

export default PageArea;
