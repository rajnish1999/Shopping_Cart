const route = require('express').Router()
const Product = require('./db').Product

route.get('/support',(req,res)=>{
    res.render('support');
})
exports = module.exports={
    route
}