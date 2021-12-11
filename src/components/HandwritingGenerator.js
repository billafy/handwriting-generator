import React, { useContext } from "react";
import "../styles/handwritingGenerator.scss";
import { getDummyContent } from "../utils/utils";
import PageArea from "./PageArea";
import PageOptions from "./PageOptions";
import Page from "./Page";
import PageInput from "./PageInput";
import { AppContext } from "../context";

const dummyContent = getDummyContent();

const HandwritingGenerator = () => {
	const {
		ref: { contentRef },
	} = useContext(AppContext);

	return (
		<div className="container">
			<PageOptions />
			<div className="main-container">
				<Page />
				<PageInput />
			</div>
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