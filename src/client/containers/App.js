import React from 'react'
import { hot } from 'react-hot-loader'
import ErrorHandler from './ErrorHandler'
import Layout from '../components/Layout'
import '../global.scss'

const App = () => (
    <ErrorHandler>
        <Layout/>
    </ErrorHandler>
)

export default hot(module)(App)
