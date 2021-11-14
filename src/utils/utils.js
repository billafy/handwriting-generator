import characters, { topOffsetCharacters } from "../data/data";
import { toPng } from "html-to-image";

/* fetches the characters and sets the styling for each */

export const getCharacters = () => {
	const characterMap = {};
	characters.forEach((character) => {
		characterMap[character] = {
			image: `/alphabets/${character === " " ? "" : character}-sm.png`,
			style: {
				position: "relative",
				height: "15.5px",
				top: topOffsetCharacters.includes(character) ? "10px" : "3px",
				margin: "0px 0.5px"
			},
		};
	});
	return characterMap;
};

/* saves snapshot of the page */

const snapshotOptions = {
	filter: (node) => {
		if(node.classList.contains('blink')) 
			return false;
		return true;
	},
	canvasWidth: 2480,
	canvasHeight: 3508,
};

export const saveSnapshot = (element) => {
	toPng(element, snapshotOptions)
		.then((url) => {
			const link = document.createElement("a");
			link.download = "snapshot.png";
			link.href = url;
			link.click();
		})
		.catch((err) => {});
};
