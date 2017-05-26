// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z


var tweets2009;
var tweets2010;
var tweets2011;
var tweets2012;
var tweets2013;
var tweets2014;
var tweets2015;
var tweets2016;
var tweets2017;

var questionTweets;


// Anything in preload will finish before setup() is triggered
function preload(){
	tweets2009 = loadJSON('./trumpTweets2009-2017/condensed_2009.json');
	tweets2010 = loadJSON('./trumpTweets2009-2017/condensed_2010.json');
	tweets2011 = loadJSON('./trumpTweets2009-2017/condensed_2011.json');
	tweets2012 = loadJSON('./trumpTweets2009-2017/condensed_2012.json');
	tweets2013 = loadJSON('./trumpTweets2009-2017/condensed_2013.json');
	tweets2014 = loadJSON('./trumpTweets2009-2017/condensed_2014.json');
	tweets2015 = loadJSON('./trumpTweets2009-2017/condensed_2015.json');
	tweets2016 = loadJSON('./trumpTweets2009-2017/condensed_2016.json');
	tweets2017 = loadJSON('./trumpTweets2009-2017/condensed_2017.json');
}

// Now we can do stuff with the text
function setup() {

	questionTweets = [];

	var tweetsArray = [tweets2009,tweets2010,tweets2011,tweets2012,tweets2013,tweets2014,tweets2015,tweets2016,tweets2017];

	for(var i = 0; i < tweetsArray.length; i++){
		for(var j = 0; j < tweetsArray[i].length; j++){
			if(tweetsArray[i][j]["is_retweet"] === false){
				var regex1 = /\?{1,}/;
				var regex2 = /^((?!realDonaldTrump).)*$/;
				var regex3 = /^"?[^@]/;
				var tweetText = tweetsArray[i][j].text;
				if(regex1.test(tweetText)){
					if(regex2.test(tweetText)){
						if(regex3.test(tweetText)){
							questionTweets.push(tweetsArray[i][j]);							
						}
					}
				}
			}
		}
	}
	var counter = 0;
	while(counter < 10){
		var number = Math.floor(Math.random() * questionTweets.length);
		for(var key in questionTweets[number]){
			createP(key + ': ' + questionTweets[number][key]);
		}
		counter++;
	}
}

