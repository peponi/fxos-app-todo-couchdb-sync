var gulp    = require('gulp'),
    frisby  = require('frisby');

/**
 * API Tests with Frisby
 */

/**
 * DOCS
 * http://frisbyjs.com/
 */
gulp.task('test:api', function() {
    frisby.create('Get Brightbit Twitter feed')
    .get('https://api.twitter.com/1/statuses/user_timeline.json?screen_name=brightbit')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('0', {
        place: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); }, // Custom matcher callback
        user: {
            verified: false,
            location: "Oklahoma City, OK",
            url: "http://brightb.it"
        }
    })
    .expectJSONTypes('0', {
        id_str: String,
        retweeted: Boolean,
        in_reply_to_screen_name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
        user: {
            verified: Boolean,
            location: String,
            url: String
        }
    })
    .toss();
});
