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


route.get('/deleteProduct',auth.ensureLoggedIn('/users/login'),isAdmin,
(req,res)=>{
    res.render('deleteProduct')
})

route.post('/deleteProduct', (req, res) => {
    Product.destroy({
        where: {
            id: req.body.ID,
        },
    }).then((product) => {
        if (!product) {
            req.flash('error', 'product not Found!!!')
            res.redirect('/deleteProduct')
            return
        }
        console.log('deleted')
        res.redirect('/')
    }).catch((err) => console.log(err))
})

exports=module.exports={
    route
}