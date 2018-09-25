import React from 'react'
import ErrorHandler from './ErrorHandler'
import Layout from '../components/Layout'
import '../global.scss'

const App = () => (
	<ErrorHandler>
		<Layout />
	</ErrorHandler>
)

export default App
