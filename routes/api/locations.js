const express = require('express');
const router = express.Router();
const Location = require('../../models/Location');

const validateTrackInput = require('../../validation/track.js');

router.get('/test', (req, res) => res.json({msg: 'Locations route is working'}));

router.post('/track', (req,res) => {

    const{ errors, isValid } = validateTrackInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const location = new Location({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng
    });

    location.save()
        .then(location => res.json(location))
        .catch(err => console.log(err));

});

module.exports = router;
