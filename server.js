
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const movies = require('./controllers/movies.js')
const reviews = require('./controllers/reviews.js');
const comments = require('./controllers/comments.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

reviews(app);
comments(app);
movies(app);

app.listen(process.env.PORT || '3000', () => {
    console.log(`App listening on port 3000!`)
})
