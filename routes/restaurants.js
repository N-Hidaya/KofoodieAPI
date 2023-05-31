const express = require('express');
const router = express.Router();
const kofoodie = require('../data/kofoodie.json');
const Joi = require('joi')


router.get(`/`, (req, res) => {
    res.status(200)
    res.send(kofoodie);
})

router.get(`/:id`, (req, res) => {
    const restaurant = kofoodie.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) res.status(404).send('The restaurant with the given id does not exist');
    res.send(restaurant);
})

//Insert new restaurant data
router.post('/', (req, res) => {
    const restaurant = {
        id: kofoodie.length + 1,
        slug: req.body.slug,
        date: req.body.date,
        restaurantname: req.body.restaurantname,
        desc: req.body.desc,
        location: req.body.location,
        locationkr: req.body.locationkr,
        operatinghrs: req.body.operatinghrs,
        contact: req.body.contact,
        deliveryoption: req.body.deliveryoption,
        dine: req.body.dine,
        takeaway: req.body.takeaway,
        rating: req.body.rating,
        price: req.body.price,
        image_url: req.body.image_url,
        image_alt: req.body.image_alt,
        gmap: req.body.gmap
    };
    kofoodie.push(restaurant);
    res.send(restaurant);
})

//Update a restaurant searched by id
router.put('/:id', (req, res) => {
    const restaurant = kofoodie.find(r => r.id === parseInt(req.params.id))
    if(!restaurant) res.status(404).send('The restaurant with the given ID does not exist')

    const validateSlug = {
        slug: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, validateSlug);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    

    restaurant.slug = req.body.slug;
    res.send(restaurant)
})

//Delete restaurant searched by ID
router.delete('/:id', (req, res) => {
    const restaurant = kofoodie.find(r => r.id === parseInt(req.params.id))
    if(!restaurant) res.status(404).send('The restaurant with the given ID does not exist')

    const index = kofoodie.indexOf(restaurant)
    kofoodie.splice(index, 1);

    res.send(restaurant);
})

module.exports = router;
    