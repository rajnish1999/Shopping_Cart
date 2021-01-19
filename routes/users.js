const route = require('express').Router()
const Users = require('./db').Users
const passport = require('../passportWork/setuppassport')

route.get('/signup', (req, res) => {
    res.render('signup')
})
route.post('/signup', (req, res) => {

    const { username, email, password } = req.body;

    let errors = [];

    if (!username || !email || !password) {
        errors.push({ msg: "please enter all fields" })
    }

    if (password.length < 6) {
        errors.push({ msg: "Password must have atleast 6 characters" })
    }

    if (errors.length > 0) {
        res.render('signup', {
            errors,
            username,
            email,
            password
        })
    }
    else {
        Users.findOne({
            where: {
                email: email
            }
        })
            .then((user) => {
                if (user) {
                    errors.push({ msg: "Email already existed" })
                    res.render('signup', {
                        errors,
                        username,
                        email,
                        password
                    })
                }
                else {
                    Users.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                    })
                        .then((user) => {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/users/login')
                        })
                        .catch((err) => {    //here the control will come never ,because we have checked all the possible errors before

                            res.redirect('/users/signup')
                        })
                }
            })

    }

})

route.get('/login', (req, res) => {
    
    res.render('login')
})
route.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
})
)

route.get('/login/facebook',passport.authenticate('facebook'))

route.get('/login/facebook/callback',passport.authenticate('facebook',{
    successReturnToOrRedirect: '/',
   // successRedirect: "/",
    failureRedirect : '/users/login',
    failureFlash: true
}))

route.get('/login/google',passport.authenticate('google', {scope: ['profile', 'email']}))

route.get('/login/google/callback',passport.authenticate('google',{
    successReturnToOrRedirect: '/',
   successRedirect: "/",
    failureRedirect : '/users/login',
    failureFlash: true
}))

route.get('/login/github',passport.authenticate('github'))

route.get('/login/github/callback',passport.authenticate('github',{
     
    successRedirect: "/",
    failureRedirect : '/users/login',
    failureFlash: true
}))

route.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

exports = module.exports = {
    route
}