const mongoose = require('mongoose');

// create a model


// A more complex Schema

// const bookSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     author: {
//         type: String,
//         maxLength: 50
//     },
//     pages: {
//         type: Number,
//         max: 5000
//     },
//     inStock: {
//         type: Boolean,
//         default: true
//     },
//     genre: {
//         type: String,
//         enum: ['Fiction', 'Classic', 'History']
//     }
// })

// Schema for book
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    released: Date,
    inStock: Boolean,
    genre: String
});

// Create the model
const Book = mongoose.model('Book', bookSchema);


// Make the connection to the database
// 'mongodb://localhost/<NameOfTheDatabase>' - this either exists or get's created
mongoose.connect('mongodb://localhost/mongoose-intro', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('succesfully connected')
    })
    .catch(err => {
        console.log('an error ocurred: ', err)
    })

// CRUD -> Create Read Update Delete

// All the queries can be found here: https://mongoosejs.com/docs/queries.html

// create a book with the properties of the passed object

// another way to do it: insertMany() -> this get's an array
// Book.create({
//     title: 'IQ84',
//     author: 'Haruki Murakami',
//     pages: 250
// }).then(book => {
//     console.log(book);
// }).catch(err => {
//     console.log(err);
// })

// Find a book by it's id

// Book.findById('6078513c58e532c607150836').then(book => console.log(book))

// Find a book with a query

// Book.find({ title: 'Norwegian wood' }).then(book => console.log(book));

// Get all the books - use find without a parameter 

// Book.find().then(books => console.log(books));


// find a book and update it -> this returns only the updated document if you pass

// a third object as a parameter {new: true}

// Book.findOneAndUpdate({ title: 'Gefaehrliche Geliebte' }, { title: 'IQ84' }, { new: true })

//     .then(book => console.log(book))

// delete the book matching the query

// Book.findOneAndDelete({ title: 'IQ84' })
//     .then(book => console.log(book))


const userSchema = mongoose.Schema({
    name: {
        type: String,
        set: value => {
            return value
                .split(' ')
                .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
                .join(' ');
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        validate: {
            message: 'Email must be lowercase',
            validator: value => {
                if (value.toLowerCase() === value && value.includes('@')) return true;
                return false;
            }
        }
    }
})

const User = mongoose.model('User', userSchema);

User.create({ name: 'bob parker', email: 'peter@gmail.com', hairColor: 'blond' })
    .then(user => {
        console.log(user);
        // this closes the connection
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err)
    })