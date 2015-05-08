var  Datastore = require('nedb')
    , moviedb = new Datastore({filename: __dirname + '/data/movies.db', autoload: true})

moviedb.find({ category : 'bangla'}, function (err, result) {
    console.log(result);

});
moviedb.count({}, function (e, c) {
    console.log(c);

});