'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)

var Permintaan = require('./Permintaan.js');

var Minta = new Permintaan();

// Minta.getSource({
// 	url: "https://docs.angularjs.org/tutorial/step_01"
// }, false).then(function (content) {
// 	// console.log(content);

// 	it("using phantomJS", function() {
// 		expect(content).to.exist
// 	})
	
// })


// expectation
describe("new Permintaan()", function() {
	describe(".getSource()", function() {

		it("using request.js", function() {
			Minta.getSource({
				url: "https://docs.angularjs.org/tutorial/step_01"
			}, true).then(function (content) {
				expect(content).to.exist;
			});	
		});

		it("using phantomJS", function() {
			this.timeout(15000);
			Minta.getSource({
				url: "https://docs.angularjs.org/tutorial/step_01"
			}, false).then(function (content) {
				expect(content).to.exist;
			});	
		});

	});
});