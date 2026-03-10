var express = require('express');
var router = express.Router();
const { Club, Officer } = require('../models');
const { Op } = require('sequelize');
const clubController = require('../controllers/clubController');
const eventController = require('../controllers/eventController');
const newsController = require('../controllers/newsController');

// GET home page - shows all clubs from database
router.get('/', function (req, res) {
  res.redirect('/clubs/');
})

router.get('/clubs/', clubController.displayAll)

// GET individual club page by ID
router.get('/clubs/:clubId', clubController.displayClub)

// SHINE'S FORM ROUTES

// GET club creation form
/*
router.get('/club/add', clubController.renderAddClubForm);

// POST new club - handles form submission
router.post('/club/add', clubController.renderAddClubForm);


 */

// GET club creation form
router.get('/clubcreate', function(req, res) {
  res.render('club-create', { title: 'Create New Club' });
});

// POST new club - handles form submission
router.post('/clubs', async function(req, res) {
  try {
    console.log('Form data received:', req.body); // Debug: see what data is coming in

    const newClub = await Club.create({
      clubname: req.body.clubname,
      advisorfirstname: req.body.advisorfirstname,
      advisorlastname: req.body.advisorlastname,
      meetingdate: req.body.meetingdate,
      clubroomnumber: req.body.clubroomnumber,
      category: req.body.category,
      smalldescription: req.body.smalldescription,
      clublogo: req.body.clublogo || 'placeholder.jpg'
    });

    console.log('Club created successfully:', newClub.id); // Debug: success
    res.redirect('/clubs/' + newClub.id);
  } catch (error) {
    console.error('FULL ERROR:', error); // Debug: see full error object
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors.map(e => e.message));
    }

    res.render('club-create', {
      title: 'Create New Club',
      error: 'Failed to create club: ' + error.message,
      formData: req.body // Send back the form data so user doesn't lose it
    });
  }
});


// GET officer registration form
router.get('/registerofficer', function(req, res) {
  res.render('register-officer', { title: 'Register Officer' });
});

// POST new officer
router.post('/officers', async function(req, res) {
  try {
    await Officer.create({
      officertitle: req.body.officertitle,
      officerfirstname: req.body.officerfirstname,
      officerlastname: req.body.officerlastname,
      clubin: req.body.clubin,
      officerstudentid: req.body.officerstudentid,
      officergradelevel: req.body.officergradelevel,
      officerusername: req.body.officerusername,
      officerpassword: req.body.officerpassword
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
router.get('/search', async function(req, res) {
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

    res.render('index', {
      title: 'Search Results',
      clubs: clubs.map(club => ({
        id: club.id,
        name: club.clubname,
        meeting: club.meetingdate,
        location: club.clubroomnumber,
        shortDesc: club.smalldescription,
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
router.get('/clubs/:id/edit', clubController.renderEditClub);

// POST update club
router.post('/clubs/:id/edit',clubController.updateClub);


// POST delete club
router.get('/clubs/:id/delete', clubController.deleteClub);


// POST new club event
router.post('/clubs/:clubId/event/create', eventController.createEvent);

// GET delete club event
router.get('/clubs/:clubId/event/delete/:eventId', eventController.deleteEvent);

// POST new club news
router.post('/clubs/:clubId/news/create', newsController.createNews);

//GET delete club news
router.get('/clubs/:clubId/news/delete/:newsId', newsController.deleteNews);

module.exports = router;