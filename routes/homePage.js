const passport = require('../passportWork/setuppassport')
const route = require('express').Router()
const Product = require('./db').Product

route.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
                if(req.user)
                res.render('index.hbs',{products:products , User:req.user.username})  
                else
                res.render('index.hbs',{products:products})  
                 
        })
        .catch((err) => {
            res.status(500).send("cannot find")
        })
})

exports=module.exports={
    route
}