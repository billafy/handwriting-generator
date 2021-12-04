import React from 'react'

import Header from './components/Header';
import HandwritingGenerator from './components/HandwritingGenerator'
import NotSupported from './components/NotSupported';

/* import SortingVisualizer from './extras/SortingVisualizer'; */

const App = () => {
	return (
		<>
			<Header/>
			<HandwritingGenerator/>
			<NotSupported/>
		</>
		// <SortingVisualizer/>
	)
}

export default App;