/**
 * Created by sabbir on 5/7/15.
 * Config for Elaach server
 */

var base = 'http://elaach.com';
var baseMovie = base + '/index.php/movie';

module.exports.config = {
  base : base,
  movies : {
    english : baseMovie + '/menu-english',
    hindi: baseMovie+ '/menu-hindi',
    bangla: baseMovie + '/2025-03-06-23-14-19',
    others: baseMovie+ '/menu-other-language',
    animation: baseMovie+ '/menu-animation'
  }
};
