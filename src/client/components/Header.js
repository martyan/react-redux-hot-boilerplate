import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import './Header.scss'

const Header = ({ history }, { t }) => (
  <div styleName="header">
    <div styleName="logo">Logo</div>
    <div styleName="nav">
      <a onClick={() => history.push('/')}>{t('home')}</a>
      <a onClick={() => history.push('/about')}>{t('about')}</a>
    </div>
  </div>
)

Header.contextTypes = {
  t: PropTypes.func.isRequired
}

Header.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(Header)
