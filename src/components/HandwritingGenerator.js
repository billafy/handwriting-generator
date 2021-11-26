import React, { useState, useEffect, useRef } from "react";
import "../styles/handwritingGenerator.scss";
import {
	capitalize,
	getCharacters,
	saveSnapshot,
	getDummyContent,
	getTopOffset,
} from "../utils/utils";
import {
	characterList,
	pages
} from "../data/data";
import PageArea from "./PageArea";

let dummyContent = getDummyContent();
const characters = getCharacters();

const HandwritingGenerator = () => {
	const pageRef = useRef(null);
	const contentRef = useRef([]);
	const [page, setPage] = useState(pages['ruled']);
	const [blink, setBlink] = useState({
		type: "body",
		position: { top: 3, left: 4 },
	});
	const [widths, setWidths] = useState({});
	const [backupPage, setBackupPage] = useState(pages['unruled']);

	const updatePage = (newPage = {content: page.content, input: page.input, stats: page.stats}) => {
		setPage(_page => {
			_page[page.type] = {..._page[page.type], ...newPage}
			return _page;
		})
	};

	const updateBlink = (type, stats) => {
		setBlink({
			type,
			position: {
				top: getTopOffset("blink", stats.newLines),
				left: stats.length,
			},
		});
	};

	const setNewContent = (newValue, name) => {
		const newContent = [];
		let newLines = 0,
			length = 4;
		newValue.forEach((char, index) => {
			if (char === "\n" || length + widths[char] > page.areaLength[name]) {
				++newLines;
				length = 4;
			}
			if (!characters[char]) return;
			newContent.push({
				char: characters[char].image,
				style: {
					...characters[char].style,
					top: getTopOffset(characters[char], newLines),
					left: `${length}px`,
				},
			});
			if (isNaN(widths[char])) return window.location.reload();
			length += widths[char];
		});
		let _content = page.content;
		_content[name] = newContent;
		updatePage({content: _content, stats: {length, newLines}});
		updateBlink(name, { length, newLines });
	};

	const handleInput = ({ target: { value, name } }) => {
		updatePage({content: []});
		let newValue = [...value];
		newValue = newValue.filter(
			(char) => Object.keys(characterList).includes(char) || char === "\n"
		);
		setNewContent(newValue, name);
		const _input = page.input;
		_input[name] = newValue.join('');
		updatePage({input: _input});
	};

	const switchPageType = (pageType) => {
		const prevPage = page;
		setPage(backupPage);
		setBackupPage(prevPage);
	}

	useEffect(() => {
		let newWidths = {};
		Object.keys(characters).forEach((char, i) => {
			newWidths[char] = contentRef.current[i];
		});
		setWidths(newWidths);
	}, []);

	return (
		<div className="container">
			<div className="selectPageType">
				<label htmlFor="pageType">Page Type</label>
				<select
					value={page.type}
					onChange={({ target: { value } }) => switchPageType(value)}
					name="pageType"
				>
					<option value="ruled">Ruled Paper</option>
					<option value="unruled">Unruled Paper</option>
				</select>
			</div>
			<div className="page-container">
				<div
					className='page'
					style={{
						...page.pageStyle,
						backgroundImage: `url(/characters/${page.type}.png)`,
					}}
					ref={pageRef}
				>
					{Object.keys(page.content).map((type, index) => {
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
				<form>
					<div className='textAreas' style={page.textAreaStyle}>
						{Object.keys(page.input).map((type) => {
							return (
								<textarea
									key={type}
									value={page.input[type]}
									onChange={handleInput}
									onFocus={({ target: { name } }) =>
										updateBlink(name, page.stats[name])
									}
									name={type}
									placeholder={`${capitalize(type)}`}
								/>
							);
						})}
					</div>
					<input
						type="button"
						onClick={() => saveSnapshot(pageRef.current)}
						value="Save"
					/>
				</form>
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