const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Use for activity logging
app.use(morgan('dev'));

//Parse body request so it is readable
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

//CORS error-handling
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONs') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});


//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;