import React from 'react'
import PropTypes from 'prop-types'
import './Footer.scss'

const Footer = ({ setLanguage }, { t }) => (
  <div styleName="footer">
    <div styleName="inner">
      <div styleName="language">
        <a onClick={() => setLanguage('en')}>{t('languageEN')}</a>
        <a onClick={() => setLanguage('cs')}>{t('languageCS')}</a>
      </div>
    </div>
  </div>
)

Footer.contextTypes = {
  t: PropTypes.func.isRequired
}

Footer.propTypes = {
  setLanguage: PropTypes.func.isRequired
}

export default Footer
