import React from "react";
import { MdOutlineMonitor } from "react-icons/md";
import '../styles/notSupported.scss';

const NotSupported = () => {
	return (
		<div className="notSupported">
			<MdOutlineMonitor />
			<h1>Come back when you have a screen larger than 556 pixels</h1>
		</div>
	);
};

export default NotSupported;
