const router = require('express').Router();
const auth = require('../services/auth');
// const API_KEY = process.env.API_KEY;
// const API_URL = `http://api.brewerydb.com/v2/search?q=${search}&key=`;

const Beers = require('../models/beers_model');
// const User = require('../models/users_model');

// router.get('/', Beers.findOne, (req, res) => {
//     // console.log('Rendering one beer', res.locals.oneBeer);
//     const beerData = { data: res.locals.oneBeer };
//     res.json(beerData);
// });

router.post('/search',
    Beers.search,
    (req, res) => {
        const { beersData } = res.locals;
        res.json({ "beersData": beersData });
    });

router.get('/', Beers.findAll, 
	(req, res) => {
		res.json({
			beers: res.locals.allBeers
		});
	});


router.get('/:id', Beers.findById,
	(req, res) => {
		res.json({
			beers: res.locals.beer
		});
	});

router.post('/', Beers.create,
	(req, res) => {
		res.json({
			beers: res.locals.newBeer
		});
	});

router.put('/:id', Beers.update,
	(req, res) => {
		res.json({
			beers: res.locals.edit
		});
	});


router.delete('/:id', Beers.destroy,
	(req, res) => {
		res.send('deleted')
	});

module.exports = router;