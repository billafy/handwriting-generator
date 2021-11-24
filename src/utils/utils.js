import { characterList } from "../data/data";
import { toPng } from "html-to-image";

/* character related properties and functions */

export const characterSize = 13;
export const characterMargin = 0.5;
const characterTopOffset = 3;

const characterStyles = {
	position: "absolute",
	height: characterSize,
	margin: `${
		15.5 - characterSize
	}px ${characterMargin}px 0px ${characterMargin}px`,
};

export const getCharacters = () => {
	const characterMap = {};
	Object.keys(characterList).forEach((character) => {
		characterMap[character] = {
			image: `/alphabets/${characterList[character].filename}.png`,
			style: {
				...characterStyles,
				top: `${
					characterTopOffset +
					(characterList[character].topOffset || 0)
				}px`,
			},
		};
	});
	return characterMap;
};

export const getDummyContent = () => {
	const dummyContent = [];
	Object.keys(characterList).forEach((character) => {
		dummyContent.push({
			char: `/alphabets/${characterList[character].filename}.png`,
			style: {
				...characterStyles,
				visibility: "hidden",
			},
		});
	});
	return dummyContent;
};

export const getTopOffset = (char, newLines) => {
	let top;
	if (char === "blink") top = 3;
	else top = Number(char.style.top.slice(0, char.style.top.length - 2));
	return `${newLines * 19.5 + top}px`;
};

/* saves snapshot of the page */

export const saveSnapshot = (element) => {
	const snapshotOptions = {
		filter: (node) => {
			if (node.classList.contains("blink")) return false;
			return true;
		},
		canvasWidth: 2480,
		canvasHeight: 3508,
	};
	toPng(element, snapshotOptions)
		.then((url) => {
			const link = document.createElement("a");
			link.download = "snapshot.png";
			link.href = url;
			link.click();
		})
		.catch((err) => {});
};

/* miscellanous utility functions */

export const capitalize = (s) => {
	if (!s || !s[0]) return s;
	return `${s[0].toUpperCase()}${s.slice(1, s.length)}`;
};
