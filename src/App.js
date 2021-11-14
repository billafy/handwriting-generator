import React from 'react'

import Header from './components/Header';
import HandwritingGenerator from './components/HandwritingGenerator'
import NotSupported from './components/NotSupported';

const App = () => {
	return (
		<>
			<Header/>
			<HandwritingGenerator/>
			<NotSupported/>
		</>
	)
}

export default App;