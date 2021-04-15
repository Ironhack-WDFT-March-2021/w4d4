const express = require('express')
const app = express();

// import the movies from movies.js

const movies = require('./movies.json');

console.log(movies);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    const todoList = ['learn node', 'learn react', 'play nintendo', 'watch devs', 'watch dark'];
    const name = 'Thomas';
    const upperCased = name.toUpperCase();
    res.render('index', { name: upperCased, list: todoList, tag: '<h3>This is html</h1>' });
})

app.get('/movies', (req, res) => {
    res.render('movies', { moviesList: movies });
})

app.listen(3000, () => {
    console.log('Server listening');
})