var express = require('express');
var router = express.Router();
const { Club, Officer, User } = require('../models');
const { Op } = require('sequelize');
const clubController = require('../controllers/clubController');
const eventController = require('../controllers/eventController');
const newsController = require('../controllers/newsController');

// GET home page - shows all clubs from database
router.get('/', addUserToViews, function (req, res) {
  res.redirect('/clubs/');
})

router.get('/clubs/', addUserToViews, clubController.displayAll)


// SHINE'S FORM ROUTES

// GET club creation form

router.get('/club/add', addUserToViews, clubController.renderAddClubForm);

// POST new club - handles form submission
router.post('/club/add', addUserToViews, clubController.addClub);

// GET individual club page by ID
router.get('/clubs/:clubId(\\d+)', addUserToViews, clubController.displayClub)



/*
// GET club creation form
router.get('/clubcreate', function(req, res) {
  res.render('club-create', { title: 'Create New Club' });
});
*/


// GET officer registration form
router.get('/registerofficer', addUserToViews, function(req, res) {
  res.render('register-officer', { title: 'Register Officer' });
});

// POST new officer
router.post('/officers', addUserToViews, async function(req, res) {
  try {
    await Officer.create({
      officertitle: req.body.officertitle,
      officerfirstname: req.body.officerfirstname,
      officerlastname: req.body.officerlastname,
      clubin: req.body.clubin,
      officerstudentid: req.body.officerstudentid,
      officergradelevel: req.body.officergradelevel,
      officerusername: req.body.officerusername,
      officerpassword: req.body.officerpassword,
      officerimage: req.body.officerimage
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error creating officer:', error);
    res.render('register-officer', {
      title: 'Register Officer',
      error: 'Failed to register officer: ' + error.message
    });
  }
});

// GET search clubs
router.get('/search', addUserToViews,async function(req, res) {
  try {
    const query = req.query.q;
    const clubs = await Club.findAll({
      where: {
        [Op.or]: [
          { clubname: { [Op.iLike]: `%${query}%` } },
          { category: { [Op.iLike]: `%${query}%` } },
          { smalldescription: { [Op.iLike]: `%${query}%` } }
        ]
      }
    });

    res.render('clubs/viewAll', {
      title: 'Search Results',
      clubs: clubs.map(club => ({
        id: club.id,
        name: club.clubname,
        meeting: club.meetingdate,
        location: club.clubroomnumber,
        shortDesc: club.smalldescription,
        bigDesc: club.bigdescription,
        commitment: 'TBD',
        advisor: `${club.advisorfirstname || ''} ${club.advisorlastname || ''}`.trim(),
        officers: 'See details page',
        banner: club.clublogo || '/images/placeholder-banner.png',
        logo: club.clublogo || '/images/placeholder-logo.png',
        category: club.category
      })),
      searchQuery: query
    });
  } catch (error) {
    console.error('Search error:', error);
    res.redirect('/');
  }
});

// GET edit club form
router.get('/clubs/:clubId/edit', addUserToViews, clubController.renderEditClub);

// POST update club
router.post('/clubs/:id/edit', addUserToViews, clubController.updateClub);


// POST delete club
router.get('/clubs/:id/delete', addUserToViews, clubController.deleteClub);


// POST new club event
router.post('/clubs/:clubId/event/create', addUserToViews, eventController.createEvent);

// GET delete club event
router.get('/clubs/:clubId/event/delete/:eventId', addUserToViews, eventController.deleteEvent);

// POST new club news
router.post('/clubs/:clubId/news/create', addUserToViews, newsController.createNews);

//GET delete club news
router.get('/clubs/:clubId/news/delete/:newsId', addUserToViews, newsController.deleteNews);

// GET remove officer from club
router.get('/clubs/:clubId/officer/delete/:officerId', addUserToViews, clubController.removeOfficerFromClub);

const md5 = require('md5');

router.get('/registeruser', addUserToViews, function(req, res) {
  res.render('users/register-user', { title: 'Register User' });
});

router.post('/registeruser', addUserToViews, async function (req, res) {
  try {

    const existingUser = await User.findOne({
      where: { email: req.body.email }
    });

    if (existingUser) {
      return res.render('register-user', {
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

    res.render('register-user', {
      title: 'Register User',
      error: 'Failed to register user: ' + error.message
    });
  }
});

const passport = require('passport');


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

function addUserToViews(req, res, next) {
  if (req.user){
    res.locals.user = req.user;
  }
  next();
}

function requireLogin(req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = router;