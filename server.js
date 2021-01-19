const express = require('express')
const app = express()
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('./passportWork/setuppassport')
const flash = require('connect-flash')
const path = require('path')

const port = process.env.PORT || 2000; 

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    session({
         store: new SQLiteStore,
        secret: 'a string for secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
        }
    })
)
//these three  should be below the  session 
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//this should be placed above setting up all the routes
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session=req.session;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();  //next is here to let the request continue
});

app.use('/', express.static(path.join(__dirname, 'public/images')))
app.use('/', require('./routes/homePage').route)
app.use('/users', require('./routes/users').route)
app.use('/products', require('./routes/products').route)
app.use('/', require('./routes/add_product').route)
app.use('/', require('./routes/deleteProduct').route)
app.use('/',require('./routes/shoppingCart').route)
app.use('/',require('./routes/search').route)
app.use('/',require('./routes/support').route)


// not using below function ,instead of this using ensureloggedIn

//   function checkLoggedIn(req,res,next){
//     if(req.user){
//         return next()
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/users/login')
// }

app.listen(port , () => {
    console.log("server running on http://localhost:2000");

})


