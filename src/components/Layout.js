import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from "react-router-dom"
import { setLanguage, detectLanguage } from '../containers/Localization/actions'

const Home = (props, { t }) => (
  <div>
    <h2>{t('home')}</h2>
  </div>
)

Home.contextTypes = {
	t: PropTypes.func.isRequired
}

const About = (props, { t }) => (
  <div>
    <h2>{t('about')}</h2>
  </div>
)

About.contextTypes = {
	t: PropTypes.func.isRequired
}


class Layout extends Component {
	static contextTypes = {
		t: PropTypes.func.isRequired
	}

	static propTypes = {
		ln: PropTypes.string.isRequired,
		setLanguage: PropTypes.func.isRequired,
		detectLanguage: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const { detectLanguage } = this.props
		detectLanguage()
	}

	render = () => {
		const { t } = this.context
		const { setLanguage } = this.props

		return (
			<div>
				<h1>{t('helloWorld')}</h1>

				<div>
					<a onClick={() => this.props.history.push('/')}>{t('home')}</a>&nbsp;
					<a onClick={() => this.props.history.push('/about')}>{t('about')}</a>
				</div>

				<br />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route component={Home}/>
				</Switch>

				<br />

				<div>
					<a onClick={() => setLanguage('en')}>{t('languageEN')}</a>&nbsp;
					<a onClick={() => setLanguage('cs')}>{t('languageCS')}</a>
				</div>

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
