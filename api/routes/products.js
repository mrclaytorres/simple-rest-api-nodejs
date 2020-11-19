const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID',
            id: id
        });
    }
    
});

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID

    res.status(200).json({
        message: 'Product has been updated!',
        id: id
    });
});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID

    res.status(200).json({
        message: 'Product successfully deleted!',
        id: id
    });
});

module.exports = router;