const passport = require('../passportWork/setuppassport')
const route = require('express').Router()
const Product = require('./db').Product
const auth = require('connect-ensure-login')

function isAdmin(req,res,next){
    
    if((req.user.username)==="rajnish"){
       return next()
    
}
else{
    req.flash("error_msg","only admin can visit the requested page")
    res.redirect('/users/login')
}
}


route.get('/addProduct',auth.ensureLoggedIn('/users/login'),isAdmin,
(req,res)=>{
    res.render('add_product')
})
route.post('/addProduct', (req, res) => {
    if (isNaN(req.body.price)) {
        return res.status(403).send({ error: "price is not a valid number" })
    }
    const newProduct = {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        price: parseFloat(req.body.price),
        imageSRC:req.body.imageSRC
    }
    Product.create(newProduct)
        .then((product) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.status(501).send({ error: err })
        })
})

exports=module.exports={
    route
}