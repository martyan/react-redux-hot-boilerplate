import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Helmet} from "react-helmet";
import Template from './template';
import App from '../client/containers/App';

export default function serverRenderer() {
    return (req, res, next) => {
        const markup = ReactDOMServer.renderToString(<App />);
        const helmet = Helmet.renderStatic();

        res.status(200).send(Template({
            markup: markup,
            helmet: helmet,
        }));
    };
}







// import React from 'react'
// import express from 'express'
// import bodyParser from 'body-parser'
// import path from 'path'
// import chalk from 'chalk'
// import compression from 'compression'
// import fs from 'fs'

// import { renderToString } from 'react-dom/server'
// import App from '../client/containers/App';

// const log = console.log
// const app = express();
// const port = process.env.PORT || 6150

// app.use(compression())
// app.use(express.static(path.resolve(__dirname, '../public/assets')))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// try {
//   app.get('*', (req, res) => {

//     const jsx = ( <App /> );
//     const reactDom = renderToString( jsx );

//     res.writeHead( 200, { "Content-Type": "text/html" } );
//     res.end( htmlTemplate( reactDom ) );
//   })

//   app.listen(port, function(){
//     log(chalk.green(`Server is running on ${port}`))
//   })
// } catch(e) {
//   log(chalk.red(e))
// }


// function htmlTemplate( reactDom ) {
//     return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <title>React SSR</title>
//         </head>
        
//         <body>
//             <div id="app">${ reactDom }</div>
//             <script src="./app.js"></script>
//             <link href="./styles.css" rel="stylesheet" />
//         </body>
//         </html>
//     `;
// }