const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result => {
        res.status(201).json({
            message: "Item created successfully.",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.path,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
    });
}

exports.products_get_single_product = (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
	.select('name price _id productImage')
	.exec()
	.then(doc => {
	  	console.log("From database", doc);
	  	if (doc) {
			res.status(200).json({
				result: doc,
				description: "Get all the products",
				request: {
					type: 'GET',
					url: 'http://localhost:3000/products/'
				}
		});
		} else {
			res.status(404).json({
				message: "No valid entry found for the provided ID."
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	});
}

exports.products_update_products = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
  
  	Product.update({_id: id}, {$set: updateOps})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Product has been updated!",
			request: {
				type: 'GET',
				url: 'http://localhost:3000/products/' + id
			}
		});
	})
	.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
	});
}

exports.products_delete_products = (req, res, next) => {
	const id = req.params.productId;
	Product.deleteOne({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Product successfully deleted!",
			request: {
					type: 'POST',
					url: 'http://localhost:3000/products/',
					body: {
						name: 'String',
						price: 'Number'
					}
				}
			});
  	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	});
}