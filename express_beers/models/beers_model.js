const axios = require('axios');
const db = require('../db/config');
const API_KEY = process.env.API_KEY;

const Beers = {};


Beers.search = (req, res, next) => {
        const { search } = req.body;
        console.log("THIS IS THE SEARCH", search)
        const beersData = [];
    		axios.get(`http://api.brewerydb.com/v2/search?q=${search}&key=${API_KEY}`)
            .then(beerData => {
                console.log('beersData is ', beerData.data);
                beerData.data.data.forEach(beer => {
                    let id = beer.id;
                    let name = beer.name;
                    let description = beer.description;
                    let website = beer.website;
                    let images = beer.images;
                    beersData.push({
                        id: id,
                        name: name,
                        description: description,
                        website: website,
                        images: images,
                    }) //end of push
                }) //end of forEach
                res.locals.beersData = beersData;
                next();
            }).catch(err => { console.log('error in beers.search', err) })
    },


Beers.findAll = (req, res, next) => {
	db.many('SELECT * FROM beers')
	.then((allBeers) => {
		res.locals.allBeers = allBeers;
		next();
	})
	.catch(err => {
		console.log(`ERROR grabbing all beers: ${err}`)
	});
};

Beers.findById = (req, res, next) => {
	const { id } = req.params;
	db.oneOrNone(`SELECT * FROM beers WHERE id=$1`, [id])
	.then((beer) => {
		res.locals.beer = beer;
		next();
	})
	.catch(err => {
		console.log(`Error grabbing beer by id: ${err}`);
	});
};

Beers.create = (req, res, next) => {
	const { name, description, image } = req.body;
	db.one(`INSERT INTO beers
		(name, description, image) VALUES
		($1, $2, $3) RETURNING *`, [name, description, image])
	.then((newBeer) => {
		res.locals.newBeer = newBeer;
		next();
	})
	.catch(err => {
		console.log(`Error creating NEW - ${err}`);
	});
};

Beers.update = (req, res, next) => {
	const { name, description, image } = req.body;
	const { id } = req.params;
	db.oneOrNone(`UPDATE beers SET
		name=$1, description=$2, image=$3
		WHERE id=$4 RETURNING *`,
		[name, description, image, id])
	.then(edit => {
		res.locals.edit = edit;
		next();
	})
	.catch(err => {
		console.log(`ERROR UPDATING: ${err}`);
	});
};

Beers.destroy = (req, res, next) => {
	const { id } = req.params;
	db.none(`DELETE FROM beers WHERE id=$1`, [id])
	.then(() => next())
	.catch(err => {
		console.log(`Could not destroy beer: ${err}`)
	});
};


module.exports = Beers;