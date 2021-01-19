const express = require("express")
const route = express.Router()
const Product = require('./db').Product
const path = require('path')
// route.use('/', express.static(path.join(__dirname, '../public/images')))
const exphbs = require('express-handlebars');




route.get('/:id', (req, res) => {

    Product.findOne({

        where: {
            id: req.params.id
        }

    })
        .then((product) => {
            // console.log("in get of products.js"+req.params.id);
            //  console.log(product);
            var str = product.specification


            var aray = str.split('@')
            if (req.user)

                res.render('specificProduct.hbs', { product: product, User: req.user.username, aray: aray })
            else
                res.render('specificProduct.hbs', { product: product, aray: aray })


        })
        .catch((err) => {
            console.log("inside error  of :id" + req.params.id);
            console.log(err);

            res.status(500).send({ error: err })
        })
})


exports = module.exports = {
    route
}