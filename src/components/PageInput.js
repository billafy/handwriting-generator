import React, {useContext} from "react";
import {AppContext} from '../context';
import {capitalize, saveSnapshot} from '../utils/utils';

const PageInput = () => {
	const {state: {page}, actions: {handleInput, updateBlink}, ref: {pageRef}} = useContext(AppContext);

	return (
		<form>
			<div className="textAreas" style={page.textAreaStyle}>
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
	);
};

export default PageInput;
