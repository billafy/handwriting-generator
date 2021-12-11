import React, { useContext } from "react";

import { AppContext } from "../context";

const PageOptions = () => {
	const {
		state: { brightness, page },
		actions: { setBrightness, switchPageType },
	} = useContext(AppContext);

	return (
		<div className="pageOptions">
			<div>
				<label htmlFor="brightness">Page Brightness</label>
				<input
					type="range"
					name="brightness"
					min={0}
					max={0.5}
					step={0.01}
					value={brightness}
					onChange={({ target: { value } }) => setBrightness(value)}
				/>
			</div>
			<div className="selectPageType">
				<label htmlFor="pageType">Page Type</label>
				<select
					value={page.type}
					onChange={({ target: { value } }) => switchPageType(value)}
					name="pageType"
				>
					<option value="ruled">Ruled</option>
					<option value="unruled">Unruled</option>
				</select>
			</div>
		</div>
	);
};

export default PageOptions;
