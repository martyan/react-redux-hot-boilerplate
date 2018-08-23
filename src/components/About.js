import React from 'react'
import PropTypes from 'prop-types'

const About = (props, { t }) => (
  <div>
    <p>{t('aboutText')}</p>
  </div>
)

About.contextTypes = {
	t: PropTypes.func.isRequired
}

export default About
