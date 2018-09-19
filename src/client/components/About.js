import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const About = (props, { t }) => (
  <div>
    <Helmet>
      <title>About</title>
    </Helmet>
    
    <div>
      <p>{t('aboutText')}</p>
    </div>
  </div>
)

About.contextTypes = {
  t: PropTypes.func.isRequired
}

export default About
