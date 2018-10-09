const webpack = require('webpack')
const webpackConfig = require('../webpack.config.dev.js')
const compiler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 8080
const chalk = require('chalk')
const log = console.log

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.resolve(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

try {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })

    app.listen(port, () => {
        log(chalk.green(`Server is running on ${port}`))
    })
} catch(e) {
    log(chalk.red(e))
}
