# Krik

[![Build Status](https://travis-ci.org/yusufsyaifudin/krikjs.svg?branch=master)](https://travis-ci.org/yusufsyaifudin/krikjs)

## Installation
```
npm install --save krikjs
```

## Initialization
```
const Krik = require('krikjs');
const Permintaan = new Krik.Permintaan();
const Scrapper = new Krik.Scrapper();

```

## Permintaan / Request
The function `Permintaan.getSource` has following parameters:

* First parameter is the `request_option`, you can read about it at [http://npmjs.com/package/request](http://npmjs.com/package/request), this params is just extension from there. So, all the thing will be the same.

* Second params is `is_generated_by_server`. If true, we will use [request package](http://npmjs.com/package/request) to make a request and get the webpage source. If false, we will use phantomJS to request the webpage with GET method.

### Request a webpage and get a source

```
const Krik = require('krikjs');
const Permintaan = new Krik.Permintaan();
var request_option = {url: "https://docs.angularjs.org/tutorial/step_01"};

var css_selector = {
	title: 'title', 
	tutorial: '#wrapper > section > div > div.grid-right > div.ng-scope'
};

Permintaan.getSource(request_option, false).then(function (content) {
	console.log(content); // here is the source of the web page

});

```



### DOM Selector
You can use jQuery DOM selector with package [jsdom](https://www.npmjs.com/package/jsdom) and [jquery](https://www.npmjs.com/package/jquery), for example if you want get all links in specific area from the webpage source:

```
const Krik = require('krikjs');
const Permintaan = new Krik.Permintaan();

var request_option = {url: "http://indeks.kompas.com/indeks/index/news"};
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
```

## Scrapper

If you want to parse a webpage with easy method, you can just call `Scrapper`. For example, in the previous code we have get all links from Kompas.com, then we can open it one by one with following code:

```
const Krik = require('krikjs');
const Permintaan = new Krik.Permintaan();
const Scrapper = new Krik.Scrapper();

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

```

## License

Copyright (c) <2016> <Yusuf Syaifudin>


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.