import characterList from "../data/data";
import { toPng } from "html-to-image";

/* fetches the characters and sets the styling for each */

const characterSize = 13;

export const getCharacters = () => {
	const characterMap = {};
	Object.keys(characterList).forEach((character) => {
		characterMap[character] = {
			image: `/alphabets/${characterList[character].filename}-sm.png`,
			style: {
				position: "relative",
				height: characterSize,
				top: `${3 + characterList[character].topOffset}px`,
				margin: `${15.5 - characterSize}px 0.5px 0px 0.5px`,
			},
		};
	});
	return characterMap;
};

/* saves snapshot of the page */

const snapshotOptions = {
	filter: (node) => {
		if (node.classList.contains("blink")) return false;
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
