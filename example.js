'use strict';

var Krik = require('./index.js');
var Permintaan = new Krik.Permintaan();
var Scrapper = new Krik.Scrapper();

var request_option = {url: "https://docs.angularjs.org/tutorial/step_01"};

var css_selector = {
	title: 'title', 
	tutorial: '#wrapper > section > div > div.grid-right > div.ng-scope'
};

// new Permintaan().getSource(request_option, false).then(function (content) {
// 	// console.log(content);
// 	new Krik().parse(content, css_selector, true).then(function (parsed) {
// 		console.log(parsed);
// 	});

// });


// Get link from Kompas Index
request_option = {url: "http://indeks.kompas.com/indeks/index/news"};
Permintaan.getSource(request_option, true).then(function (source) {

	var jsdom = require('jsdom');
	jsdom.env({
		html: source,
		done: function (err, window) {
			var $ = require("jquery")(window);

			var allLinks = $('#berita > div.kcm-main-list a').map( function() {
			    return $(this).attr('href');
			}).get();

			console.log(allLinks);

			grabNews(allLinks);
		}
	});

});

function grabNews(links) {
	for(let i=0; i<links.length; i++) {
		// foreach links, open it!
		Permintaan.getSource(links[i], true).then(function (content) {
			// then parse it!
			css_selector = 
			{
				title: '#leftside > div.kcm-read > div.kcm-read-top.clearfix > h2',
				content: '#leftside > div.kcm-read > div.kcm-read-body.clearfix > div.span6 > div > div.kcm-read-text',
				category: '#leftside > div.kcm-read > div.kcm-read-top.clearfix > ul > li:nth-child(2) > h4 > a',
				date: '#leftside > div.kcm-read > div.kcm-read-top.clearfix > div > div.kcm-date.msmall.grey'
			};

			Scrapper.parse(content, css_selector, true).then(function (parsed) {
				console.log(parsed);
			});

		});
	}
}

