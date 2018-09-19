import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const Home = (props, { t }) => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>

    <div>
      <p>{t('homeText')}</p>
    </div>
  </div>
)

Home.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Home
