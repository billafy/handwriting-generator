import React from "react";

import {characterSize} from '../utils/utils';

const PageArea = ({ content, type, blink, contentRef}) => {
	const setWidth = (element, index) => {
		if(!contentRef) 
			return;
		if (!element) contentRef.current[index] = 0;
		else 
			contentRef.current[index] = 1 + Number((characterSize / element.naturalHeight * element.naturalWidth).toFixed(3));
	};

	return (
		<div className='pageArea'>
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
			{blink.type === type && <div className="blink" style={{top: blink.position.top, left: blink.position.left}}></div>}
		</div>
	);
};

export default PageArea;
