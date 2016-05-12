'use strict';


function Scrapper() {
}

Scrapper.prototype.singleParser = function(source, css_selector, is_clean) {
	var jsdom = require('jsdom');
	var Promise = require('promise');
	var extracted;

	return new Promise(function (fulfill, reject) {
		try {
			jsdom.env({
				html: source,
				// scripts: ["http://code.jquery.com/jquery.js"],
				done: function (err, window) {
					var $ = require("jquery")(window);

					if(is_clean) {
						extracted = $(css_selector).text();
					} else {
						extracted = $(css_selector).html();
					}
					
					fulfill(extracted);
				}
			});
		} catch(e) {
			// console.log(e.message);
			//extracted = ""; // empty string instead of error
			reject(e);
		}
	});
};

Scrapper.prototype.parse = function(source, css_selector_object, is_clean) {
	if(typeof source == "string") {

		if (typeof css_selector_object == "object") {

			if(typeof is_clean == "boolean") {

				return new Promise(function(fulfill, reject) {

					try {
						var response = {};
						Object.keys(css_selector_object).forEach(function(key) {
							var selector = css_selector_object[key];
							Scrapper.prototype.singleParser(source, selector, is_clean).then(function (res) {
								response[key] = res;
							});

						});	

						fulfill(response);
					} catch (e) {
						reject(e);
					}
							

				});

			} else {
				throw new Error("is_clean must be a boolean");
			}

		} else {
			throw new Error('csspath as second parameter must be an object!');
		}
		
	} else {
		throw new Error('source as first parameter must be a string!');
	}
	

	
};

module.exports = Scrapper;