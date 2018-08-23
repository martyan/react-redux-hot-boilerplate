import React from 'react'
import PropTypes from 'prop-types'

const Home = (props, { t }) => (
  <div>
    <p>{t('homeText')}</p>
  </div>
)

Home.contextTypes = {
	t: PropTypes.func.isRequired
}

export default Home
