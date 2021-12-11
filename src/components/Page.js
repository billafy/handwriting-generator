import React, {useContext} from "react";
import {AppContext} from '../context';
import PageArea from './PageArea';

const Page = () => {
	const {state: {brightness, page, blink}, ref: {pageRef}} = useContext(AppContext);

	return (
		<div className="page-container">
			<div className="brightness" style={{ opacity: brightness }}></div>
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
	);
};

export default Page;
