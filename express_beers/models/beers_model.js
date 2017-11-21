const axios = require('axios');
const db = require('../db/config');
const API_KEY = process.env.API_KEY;

const Beers = {};


Beers.search = (req, res, next) => {
        const { search } = req.body;
        console.log("THIS IS THE SEARCH", search);
        console.log("THIS IS THE BODY", req.body);
        const beersData = [];
        const url = `http://api.brewerydb.com/v2/search?q=${search}&key=${API_KEY}`
        console.log('url:', url);
    		axios.get(url)
            .then(beerData => {
                console.log('beersData is ', beerData);
                beerData.data.data.forEach(beer => {
                    let id = beer.id;
                    let name = beer.name;
                    let description = beer.description;
                    beersData.push({
                        id: id,
                        name: name,
                        description: description,
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
	const { name, description} = req.body;
	db.one(`INSERT INTO beers
		(name, description) VALUES
		($1, $2) RETURNING *`, [name, description])
	.then((newBeer) => {
		res.locals.newBeer = newBeer;
		next();
	})
	.catch(err => {
		console.log(`Error creating NEW - ${err}`);
	});
};

Beers.update = (req, res, next) => {
	const { name, description } = req.body;
	const { id } = req.params;
	db.oneOrNone(`UPDATE beers SET
		name=$1, description=$2
		WHERE id=$3 RETURNING *`,
		[name, description, id])
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