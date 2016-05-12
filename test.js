'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var Krik = require('./index.js');
var Permintaan = new Krik.Permintaan();
var Scrapper = new Krik.Scrapper();


var request_option = {url: "https://docs.angularjs.org/tutorial/step_01"};


// expectation
describe("new Permintaan()", function() {
	describe(".getSource()", function() {

		it("using phantomJS", function() {
			this.timeout(10000);
			Permintaan.getSource(request_option, false).then(function (content) {
				expect(content).to.exist;
			});	
		});

	});

	describe("new Scrapper()", function () {
		it("using request.js and get the title of page", function() {
			Permintaan.getSource(request_option, true).then(function (content) {
				
				new Scrapper().parse(content, css_selector, true).then(function (parsed) {
					expect(parsed).to.exist;
				});
			});	
		});
	})
});