const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 6150
const chalk = require('chalk')
const log = console.log
const compression = require('compression')

// app.use(function (req, res, next) {
//   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
//   res.header('Expires', '-1')
//   res.header('Pragma', 'no-cache')
//   next()
// })

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

try {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
  })

  app.listen(port, function(){
    log(chalk.green(`Server is running on ${port}`))
  })
} catch(e) {
  log(chalk.red(e))
}