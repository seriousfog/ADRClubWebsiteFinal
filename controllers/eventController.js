const {ClubEvent} = require('../models')

module.exports.createEvent = async function (req, res){
    let clubId = req.params.clubId;
    //Check if an event with the same title and date already exists for this club
    const existingEvent = await ClubEvent.findOne({
        where: {
            eventtitle: req.body.eventtitle,
            eventdate: req.body.eventdate,
            club_id: clubId
        }
    });

    // If event already exists, skip creation and just redirect
    if (existingEvent) {
        return res.redirect(`/clubs/${clubId}`);
    }

    // If event does not exist, Create event for club
    await ClubEvent.create({
        eventtitle: req.body.eventtitle,
        eventdescription: req.body.eventdescription,
        eventdate: req.body.eventdate,
        eventstart: req.body.eventstart,
        eventend: req.body.eventend,
        eventlocation: req.body.eventlocation,
        club_id: clubId
    });
    res.redirect(`/clubs/${clubId}`);
}

// Delete existing event
module.exports.deleteEvent = async function (req, res){
    let clubId = req.params.clubId;
    let eventId = req.params.eventId;
    await ClubEvent.destroy({
        where: {
            id: eventId
        }
    });
    res.redirect(`/clubs/${clubId}`);
}