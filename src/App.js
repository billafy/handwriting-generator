import React from 'react'

import Header from './components/Header';
import HandwritingGenerator from './components/HandwritingGenerator'
import NotSupported from './components/NotSupported';

/* import SortingVisualizer from './extras/SortingVisualizer'; */

import AppProvider from './context';

const App = () => {
	return (
		<AppProvider>
			<Header/>
			<HandwritingGenerator/>
			<NotSupported/>
		</AppProvider>
		// <SortingVisualizer/>
	)
}

export default App;