import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslation } from './actions'

class LocalizationProvider extends Component {
    static childContextTypes = {
        t: PropTypes.func.isRequired
    }

    static propTypes = {
        store: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired
    }

    getChildContext = () => {
        const { store } = this.props

        return {
            t: key => store.dispatch(getTranslation(key))
        }
    }

    render = () => {
        const { children } = this.props
        return children
    }
}

export default LocalizationProvider
