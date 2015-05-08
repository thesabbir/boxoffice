var request = require('request-promise'),
    cheerio = require('cheerio'),
    elaach = require('./elaach'),
    base = elaach.config.base,
    Datastore = require('nedb')
    , moviedb = new Datastore({filename: __dirname + '/data/movies.db', autoload: true});

function getMovies(category, page) {
    var limit = 20;
    if (page == undefined) page = 0;

    request({uri: elaach.config.movies[category] + '?start=' + page + '&&limit=' + limit, timeout: 20000})
        .then(function (body) {
            return cheerio.load(body, {
                normalizeWhitespace: true,
                xmlMode: true
            })
        })
        .then(function ($) {

            var list = $('table.category > tbody > tr').find('a');

            if (list.length < 20) {
                page = null;
            }
            var urls = [];

            list.map(function (index, elem) {
                urls.push(base + $(this).attr('href'));
            });
            if (urls.length == limit) {
                getMovies(category, page + limit);
            }
            return urls;
        })
        .map(function (url) {
            request({uri: url, timeout: 20000})
                .then(function (body) {
                    return cheerio.load(body);
                })
                .then(function ($) {
                    return {
                        "title": $('.dd-postheader > a').text(),
                        "cover": base + $('.dd-article').find('img').attr('src'),
                        "file": $('.dd-article').find('a').attr('href'),
                        "category": category
                    }
                })
                .then(function (data) {
                    moviedb.insert(data, function (err, data) {
                        console.log("Inserted \"%s\" to the database.", data.title);
                    })
                });
        }
    )
        .
        catch(console.error);
}

for(var cat in elaach.config.movies) {
    getMovies(cat);
}
