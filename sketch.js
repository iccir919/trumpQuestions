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

var quote;
var quoteDate;


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
	quote = '';
	quoteDate = '';

	var tweetsArray = [tweets2009,tweets2010,tweets2011,tweets2012,tweets2013,tweets2014,tweets2015,tweets2016,tweets2017];

	for(var i = 0; i < tweetsArray.length; i++){
		for(var j = 0; j < tweetsArray[i].length; j++){
			if(tweetsArray[i][j]["is_retweet"] === false){
				var regex1 = /\?{1,}/;
				var regex2 = /^((?!realDonaldTrump).)*$/;
				var regex3 = /^[^@".]/;
				var regex4 = /(Via|.?:www|https?|.?t\.co)[^\s]+/;
 				var tweetText = tweetsArray[i][j].text;
				if(regex1.test(tweetText)){
					if(regex2.test(tweetText)){
						if(regex3.test(tweetText)){
							tweetsArray[i][j].text = tweetsArray[i][j].text.replace(regex4, "");
							questionTweets.push(tweetsArray[i][j]);		
						}
					}
				}
			}
		}
	}
	getQuote();
	$('#new-quote').on('click', getQuote);
	$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quote + '" -Donald Trump on ' + quoteDate));
}

function getQuote(){
	var number = Math.floor(Math.random() * questionTweets.length);
	var tweet = questionTweets[number];
	quoteDate = dateFormatter(tweet.created_at);
	quote = tweet.text;
	var quoteSpace = select('#text');
	quoteSpace.html(quote);
	var dateSpace = select('#date');
	dateSpace.html(quoteDate);

}

function dateFormatter(date){
	var parts = date.split(' ');
	var month = parts[1];
	var date;
	if(parts[2][0] === "0"){
		date = parts[2][1];
	} else {
		date = parts[2];
	}
	var year = parts[5];
	return month + ' ' + date + ', ' + year; 
}


