import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import path from 'path'
import chalk from 'chalk'
import compression from 'compression'
import fs from 'fs'

import { renderToString } from 'react-dom/server'
import App from '../client/containers/App';

const log = console.log
const app = express();
const port = process.env.PORT || 6150

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

try {
  app.get('*', (req, res) => {
    const appString = renderToString(<App />);

    const indexFile = path.join(__dirname, '../public', 'index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      return res.send(
        data.replace('<div id="app"></div>', `<div id="app">${appString}</div>`)
      );
    })
  })

  app.listen(port, function(){
    log(chalk.green(`Server is running on ${port}`))
  })
} catch(e) {
  log(chalk.red(e))
}
