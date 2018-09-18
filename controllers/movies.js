// movies.js

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('e1a89d67234dd5882032f319fdce5297')
const Review = require('../models/review.js')

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
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            console.log(movie);
            if (movie.video) {
                moviedb.movieVideos({ id: req.params.id }).then(videos => {
                    console.log(movie.trailer_youtube_id);
                    movie.trailer_youtube_id = videos.results[0].key
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie)  {
                res.render('movies-show', { movie: movie });
            }

        }).catch(console.error)
    })

}
