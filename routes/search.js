const route = require('express').Router()
const Product = require('./db').Product

route.get('/search',(req,res)=>{
    Product.findAll({
        where:{
            name:req.query.name
        }
    })
    .then((products)=>{
       
           if(products.length<=0){
            req.flash('error_msg','product not found')
            return  res.redirect('/')
           }
        // console.log("products is ");
        // console.log(products);
        
        if (req.user)

                res.render('search_product', { products: products, User: req.user.username})
        else
                res.render('search_product', { products: products })
        
        
    }).catch((err)=>{
        console.log("there is error");
        
    })
})

exports=module.exports={
    route

}