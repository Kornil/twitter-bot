var twit = require('twit');

var config = require('./config.js');

var Twitter = new twit(config);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = () => {
  var params = {
      q: '100DaysOfCode, 100daysofcode',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference

  // find the tweet
  Twitter.get('search/tweets', params, (err,data) => {

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, (err, response) => {
        // if there was an error while 'favorite'
        if(err){
          console.log(`Something went wrong: ${err}`);
        }
        else{
          console.log('Tweet liked!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet every 2.5 minutes
setInterval(favoriteTweet, 1000 * (60 * 2.5));

// generate a random tweet tweet
const ranDom = (arr) => arr[Math.floor(Math.random()*arr.length)];

