const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const config = require('../webpack.config.dev.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const Loadable = require('react-loadable')

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/public/',
    serverSideRender: true,
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

const PORT = process.env.PORT || 6150;

app.use('/public', express.static('public'));

app.use((req, res, next) => {
    if(/\.js|\.css/.test(req.path)) {
        res.redirect('/public' + req.path);
    } else {
        next();
    }
});

app.use(/\.js$/, express.static('public'));

Loadable.preloadAll().then(() => {

    app.listen(PORT, error => {
        if(error) {
            return console.error(error);
        } else {
            console.log(`Development Express server running at http://localhost:${PORT}`);
        }
    });

}).catch(err => {
    console.log(err);
});
