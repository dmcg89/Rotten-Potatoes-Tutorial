// movies.js

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('e1a89d67234dd5882032f319fdce5297')
const Review = require('../models/reviews.js')

module.exports = function(app) {

    app.get('/', (req, res) => {
      moviedb.miscNowPlayingMovies().then(response => {
        res.render('movies-index', { movies: response.results });
      }).catch(console.error)
    })

    // app.get('/movies/:id', (req, res) => {
    //     moviedb.movieInfo({ id: req.params.id }).then(movie => {
    //         res.render('movies-show', { movie: movie});
    //     }).catch(console.error)
    // })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then((movie) => {
            Review.find({movieId: req.params.id}).then((reviews) =>{
//                console.log(reviews);
                if (movie.video) {
                    moviedb.movieVideos({ id: req.params.id }).then(videos => {
                        movie.trailer_youtube_id = videos.results[0].key;
                        renderTemplate(movie, reviews);
                    })
                } else {
                    renderTemplate(movie, reviews);
                }

                function renderTemplate(movie, reviews)  {
                    res.render('movies-show', { movie: movie , reviews:reviews});
                }
            })
        }).catch(console.error)
    })

}
