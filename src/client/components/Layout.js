import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { setLanguage, detectLanguage } from '../containers/Localization/actions'
import { getTodo } from '../containers/App/actions'
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
		location: PropTypes.object.isRequired,
		getTodo: PropTypes.func.isRequired
	}

	componentDidMount = () => {
		const { detectLanguage, location, getTodo } = this.props
		detectLanguage(location.search)
		getTodo(1).catch(console.error)
	}

	render = () => {
		const { setLanguage } = this.props

		return (
			<div styleName="layout">
			
        <Helmet
          // htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          // titleTemplate="%s | React App"
          // titleAttributes={{itemprop: "name", lang: "en"}}
          // meta={[
          //     {name: "description", content: "Server side rendering example"},
          //     {name: "viewport", content: "width=device-width, initial-scale=1"},
          // ]}
          // link={[{rel: "stylesheet", href: "/dist/styles.css"}]}
        />

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
    detectLanguage,
    getTodo
  }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
