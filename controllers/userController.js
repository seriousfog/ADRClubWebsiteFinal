const {User, Club, UserClub} = require('../models');


module.exports.renderRegisterUserForm = function(req, res){
    res.render('users/register-user', { title: 'Register User' });
}

module.exports.registerUser = async function(req, res){
    try {

        const existingUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (existingUser) {
            return res.render('users/register-user', {
                title: 'Register User',
                error: 'Email already registered'
            });
        }

        await User.create({
            email: req.body.email,
            password: md5(req.body.password),
            ufirstname: req.body.ufirstname,
            ulastname: req.body.ulastname,
            role: req.body.role,
        });

        res.redirect('/');

    } catch (error) {
        console.error('Error creating user:', error);

        res.render('users/register-user', {
            title: 'Register User',
            error: 'Failed to register user: ' + error.message
        });
    }
}

/*
const passport = require('passport');
const md5 = require("md5");


router.post('/login', addUserToViews, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true
    })
);

router.get('/login', addUserToViews, function (req, res) {
    res.render('users/login', { title: 'Login User' });
});

module.exports.logout = function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
    });
    res.redirect('/login');
}

router.get('/logout', addUserToViews, function(req, res) {
    req.logout(function() {
        res.redirect('/');
    });
});


router.get('/profile', addUserToViews, requireLogin, function(req, res) {
    res.render('users/userProfile', { title: 'Profile User' });
});


 */

module.exports.viewUserProfile = async function(req, res){
    const user = await User.findByPk(req.params.id, {
        include: 'clubs'
    });
    res.render('users/userProfile', {user});
}

