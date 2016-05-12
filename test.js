'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var Permintaan = require('./Permintaan.js');
var Krik = require('./Krik.js');

var request_option = {url: "https://docs.angularjs.org/tutorial/step_01"};


// expectation
describe("new Permintaan()", function() {
	var Minta = new Permintaan();
	describe(".getSource()", function() {

		it("using phantomJS", function() {
			this.timeout(10000);
			Minta.getSource(request_option, false).then(function (content) {
				expect(content).to.exist;
			});	
		});

	});

	describe("new Krik()", function () {
		it("using request.js and get the title of page", function() {
			Minta.getSource(request_option, true).then(function (content) {
				
				new Krik().parse(content, css_selector, true).then(function (parsed) {
					expect(parsed).to.exist;
				});
			});	
		});
	})
});