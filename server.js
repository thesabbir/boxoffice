var Datastore = require('nedb'),
    moviedb = new Datastore({filename: __dirname + '/data/movies.db', autoload: true}),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 4000,
    router = express.Router();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


router.get('/movies', function (req, res) {
    moviedb.find({category: 'english'}).limit(20).exec(function (err, result) {
        res.json(result);
    });
});

app.use(router);
app.listen(port);

console.log("REST server started on port " + port);