const express = require('express')
const route = express.Router()
const passport = require('../passportWork/setuppassport')
let auth = require('connect-ensure-login')
const Cart = require('./cartOperations')
const Product = require('./db').Product
const path = require('path')
const stripe = require('stripe')('sk_test_LoZgvtbMdru5r5Lx5UAMjcaV00YsNeCEJM');


route.get('/cart/:id',
auth.ensureLoggedIn('/users/login'), 
(req, res) => {

    var cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.findOne({

        where: {
            id: req.params.id
        }

    })
        .then((product) => {
            // console.log("in then of cart:id" + req.params.id);
            // console.log("product in then of cart");

            // console.log(product);
            // console.log("id before sending to add is::" + product.id);


            cart.add(product, product.id)
            // console.log("after coming back from operations :" + cart);

            req.session.cart = cart;
            // console.log("data in req.session.cart=" + req.session.cart);

            res.redirect('/shopping-cart');



        })
        .catch((err) => {
            // console.log("inside error  of :id" + req.params.id);

            res.status(500).send({ error: err })
        })
})

route.get('/shopping-cart',
    auth.ensureLoggedIn('/users/login'),
    function (req, res, next) {
        req.flash('error','No Item in Cart')
        if (!req.session.cart) {
            // console.log("not having the session");
           

            return res.render('shopping-cart', { products: null });
        }
        var cart = new Cart(req.session.cart);
        // console.log("cart coming from session");

        // console.log(cart);

        // console.log("cart changed into array");

        // console.log(cart.generateArray());


        res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
    });

route.get('/reduceByOne/:id',(req,res)=>{

console.log("inside get of reduce");

var cart = new Cart(req.session.cart)

cart.reduceByOne(req.params.id)

req.session.cart=cart;

res.redirect('/shopping-cart')
})

route.get('/removeAll/:id',(req,res)=>{
    console.log("inside get of remove");
    
    var cart = new Cart(req.session.cart)
    
    cart.removeAll(req.params.id)
    
    req.session.cart=cart;
    
    res.redirect('/shopping-cart')
})

route.get('/checkout', function (req, res, next) {
    console.log("in checkout");
    
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    // var errMsg = req.flash('error')[0];
    res.render('checkout', { total: cart.totalPrice });
});
route.post('/checkout', function(req,res,next) {
    console.log("in checkout rt post");
    if (!req.session.cart) {
        console.log("in checkout post");
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    // var stripe = require('stripe')("sk_test_LoZgvtbMdru5r5Lx5UAMjcaV00YsNeCEJM");
    // stripe.charges.create(
    //     {
    //       "source": "tok_19oF...StPM",
    //       "capture": false,
    //       "amount": 33000,
    //       "currency": "EUR",
    //       "application_fee": 100,
    //       "description": "Some description",
    //       "receipt_email": "rajnishtiwarihrt@gmail.com",

    //     },
        
    //     {stripe_account: "12345678"}
    //   );
    stripe.charges.create({
        amount: cart.totalPrice*100,
        currency: "usd",
        source: req.body.stripeToken,
        description: "Test Charge"
    }, function(err, charge) {
        if(err) {
            console.log(err);
            
           // req.flash('error', error.message);
            return res.redirect('/checkout');
        }
        console.log("out of err");
        
        req.flash('success', 'Successfully bought product');
        req.cart = null;
        res.redirect('/signup');
    });
});

exports = module.exports = {
    route
}