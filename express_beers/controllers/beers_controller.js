const router = require('express').Router();
const auth = require('../services/auth');
const Beers = require('../models/beers_model');
// const User = require('../models/users_model');

router.post('/search',
    Beers.search,
    (req, res) => {
    		console.log('---------------------------------------------')
    		console.log('in beers post /search');
        const { beersData } = res.locals;
        console.log('beersData:', beersData);
        res.json({ "beersData": beersData });
    });

router.get('/', Beers.findAll, 
	(req, res) => {
		console.log('in beers get /')
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
		console.log('---------------------------------------------')
		console.log('in beers post /')
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