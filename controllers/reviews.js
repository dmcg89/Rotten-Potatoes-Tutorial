const Review = require('../models/review')
const Comment = require('../models/comments')

module.exports = function(app) {

    //Index
    // app.get('/', (req, res) => {
    //     Review.find()
    //     .then(reviews => {
    //         res.render('reviews-index', { reviews: reviews });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // })

    // NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.movieId });
    })

    // CREATE
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review)
            res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // // SHOW
    // app.get('/reviews/:id', (req, res) => {
    //     Review.findById(req.params.id).then((review) => {
    //         res.render('reviews-show', { review: review })
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // })

    // SHOW
    app.get('/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch its comments
            Comment.find({ reviewId: req.params.id }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', { review: review, comments: comments })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    // EDIT
    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    })


    // UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
    })

    // DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

    //Delete comments
    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment");
        Comment.findOneAndDelete(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
}
