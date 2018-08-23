import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from "react-router-dom"
import { setLanguage, detectLanguage } from '../containers/Localization/actions'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import './Layout.scss'

class Layout extends Component {
	static contextTypes = {
		t: PropTypes.func.isRequired
	}

	static propTypes = {
		ln: PropTypes.string.isRequired,
		setLanguage: PropTypes.func.isRequired,
		detectLanguage: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const { detectLanguage, location } = this.props
		detectLanguage(location.search)
	}

	render = () => {
		const { t } = this.context
		const { setLanguage } = this.props

		return (
			<div styleName="layout">

				<Header />

				<div styleName="content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route component={Home}/>
					</Switch>
				</div>

				<Footer setLanguage={setLanguage} />

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  ln: state.localization.ln 	//need to subscribe so the lang change is reflected
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    setLanguage,
    detectLanguage
  }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
