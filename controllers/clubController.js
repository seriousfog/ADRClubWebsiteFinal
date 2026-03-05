const {Club, Officer, ClubEvent, News} = require('../models');


module.exports.renderAddClubForm = function(req, res){
    const club = {
        clubname: '',
        adviserfirstname: '',
        adviserlastname: '',
        meetingdate: '',
        clubroomnumber: '',
        category: '',
        clublogo: '',
        smalldescription: '',
        uniquedescription: '',
        commitment: '',
        secondadivsorfirstname: '',
        secondadivsorlastname: '',
    };
    res.render('club-create', {club});
};

module.exports.addClub = async function(req, res){
    try {
        console.log('Form data received:', req.body); // Debug: see what data is coming in

        const newClub = await Club.create({
            clubname: req.body.clubname,
            advisorfirstname: req.body.advisorfirstname,
            advisorlastname: req.body.advisorlastname,
            secondadivsorfirstname: req.body.secondadivsorfirstname,
            secondadivsorlastname: req.body.secondadivsorlastname,
            meetingdate: req.body.meetingdate,
            clubroomnumber: req.body.clubroomnumber,
            category: req.body.category,
            smalldescription: req.body.smalldescription,
            uniquedescription: req.body.uniquedescription,
            commitment: req.body.commitment,
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
};

module.exports.displayClub = async function(req, res, next) {
    try {
        const club = await Club.findByPk(req.params.clubId, {
            include: [{ model: Officer, required: false }, {model: ClubEvent, as: 'clubevents'}, {model: News, as: 'clubnews'}],
            order: [
                ['clubnews', 'news_on']
            ]
        });

        if (!club) {
            return res.status(404).render('error', {
                message: 'Club not found',
                error: { status: 404, stack: '' }
            });
        }

        // Convert to plain object to ensure associations are accessible
        const clubPlain = club.get({ plain: true });

        const officersList = club.Officers && club.Officers.length > 0
            ? club.Officers.map(o => `${o.officertitle}: ${o.officerfirstname} ${o.officerlastname}`).join(', ')
            : 'No officers listed';

        const formattedClub = {
            id: clubPlain.id,
            name: clubPlain.clubname,
            meeting: clubPlain.meetingdate,
            location: clubPlain.clubroomnumber,
            shortDesc: clubPlain.smalldescription,

            commitment: clubPlain.commitment,
            uniqueDesc: clubPlain.uniquedescription,
            advisor: `${clubPlain.advisorfirstname || ''} ${clubPlain.advisorlastname || ''}`.trim(),
            secondAdvisor: clubPlain.secondadvisorfirstname ?
                `${clubPlain.secondadvisorfirstname} ${clubPlain.secondadvisorlastname || ''}`.trim() : null,
            officers: officersList,
            banner: clubPlain.clublogo || '/images/placeholder-banner.png',
            logo: clubPlain.clublogo || '/images/placeholder-logo.png',
            category: clubPlain.category,
            clubevents: clubPlain.clubevents || [],
            clubnews: clubPlain.clubnews || []
        };

        res.render('clubs/club', {
            title: club.clubname,
            club: formattedClub
        });
    } catch (error) {
        console.error('Error fetching club:', error);
        next(error);
    }
};

module.exports.renderEditClub = async function(req, res) {
    try {
        const club = await Club.findByPk(req.params.id);
        if (!club) return res.status(404).send('Club not found');
        res.render('club-edit', {title: 'Edit Club', club: club});
    } catch (error) {
        next(error);
    }
}

module.exports.updateClub = async function(req, res) {
    try {
        await Club.update({
            clubname: req.body.clubname,
            advisorfirstname: req.body.advisorfirstname,
            advisorlastname: req.body.advisorlastname,
            secondadivsorfirstname: req.body.secondadivsorfirstname,
            secondadivsorlastname: req.body.secondadivsorlastname,
            meetingdate: req.body.meetingdate,
            clubroomnumber: req.body.clubroomnumber,
            category: req.body.category,
            smalldescription: req.body.smalldescription,
            uniquedescription: req.body.uniquedescription,
            commitment: req.body.commitment
        }, {
            where: { id: req.params.id }
        });
        res.redirect('/clubs/' + req.params.id);
    } catch (error) {
        console.error('Error updating club:', error);
        res.send('Error updating club');
    }
}

module.exports.deleteClub = async function(req, res) {
    try {
        await Club.destroy({ where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting club:', error);
        res.send('Error deleting club');
    }
}

module.exports.displayAll = async function(req, res, next) {
    try {
        const clubs = await Club.findAll();

        const formattedClubs = clubs.map(club => ({
            id: club.id,
            name: club.clubname,
            meeting: club.meetingdate,
            location: club.clubroomnumber,
            shortDesc: club.smalldescription,
            commitment: club.commitment,
            uniqueDesc: club.uniquedescription,
            advisor: `${club.advisorfirstname || ''} ${club.advisorlastname || ''}`.trim(),
            officers: 'See details page',
            banner: club.clublogo || '/images/placeholder-banner.png',
            logo: club.clublogo || '/images/placeholder-logo.png',
            category: club.category
        }));

        res.render('clubs/viewAll', {
            title: 'Edison High School Clubs',
            clubs: formattedClubs
        });
    } catch (error) {
        console.error('Error fetching clubs:', error);
        next(error);
    }
};