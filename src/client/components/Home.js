import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getTodo } from '../containers/App/actions'

class Home extends Component {

    static propTypes = {
        getTodo: PropTypes.func.isRequired,
        todo: PropTypes.object,
        todoFetched: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    static getData = getTodo.bind(null, 1)

    componentDidMount = () => {
        const { todoFetched, getTodo } = this.props

        if(!todoFetched) getTodo(1).catch(console.error)
    }

    render = () => {
        const { t } = this.context
        const { todo } = this.props

        return (
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>

                <div>
                    <p>{t('homeText')}</p>

                    {todo && <div>{todo.title}</div>}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    ln: state.localization.ln,
    todo: state.app.todo,
    todoFetched: state.app.todoFetched
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        getTodo
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
