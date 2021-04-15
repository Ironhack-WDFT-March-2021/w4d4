const express = require('express');
const app = express();

// import the movies from movies.js

const movies = require('./movies.json');

// register the public folder
app.use(express.static('public'));

// these two lines are necessary to be able to use partials
// https://www.npmjs.com/package/hbs - hbs docs
const handlebars = require('hbs');
handlebars.registerPartials(__dirname + '/views/partials');

// console.log(movies);

app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    // add {layout: false} to the object if you don't want to use the layout file for this route
    res.render('movies', { moviesList: movies });
})

app.get('/godfather', (req, res) => {
    // find the movie godfather in the movies array
    const godfather = movies.find((movie) => movie.title === 'The Godfather');
    res.render('movieDetails', { clickedMovie: godfather });
})

app.listen(3000, () => {
    console.log('Server listening');
})