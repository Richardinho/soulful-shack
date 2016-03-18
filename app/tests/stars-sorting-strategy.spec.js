describe('stars sorting strategy', function () {

	'use strict';

	var sortingStrategies = require('../sorting-strategy');

	var hotelA = {};
	var hotelB = {};

	var starSorter;

	beforeEach (function () {
		starSorter = sortingStrategies('stars');
	});
	describe('A is less than B', function () {
		beforeEach(function () {
			hotelA.Stars = 23;
			hotelB.Stars = 24;
		});
		it('should return 1', function () {
			expect(starSorter(hotelA, hotelB)).toBe(1);
		});
	});
	describe('A is greater than B', function () {
		beforeEach(function () {
			hotelA.Stars = 26;
			hotelB.Stars = 24;
		});
		it('should return -1', function () {
			expect(starSorter(hotelA, hotelB)).toBe(-1);
		});
	});
	describe('A is equal to B', function () {
		beforeEach(function () {
			hotelA.Stars = 26;
			hotelB.Stars = 26;
		});
		it('should return 0', function () {
			expect(starSorter(hotelA, hotelB)).toBe(0);
		});
	});
	describe('when an array of hotels is sorted', function () {
		var hotels;
		beforeEach(function () {
			hotels = [
				{
					Name : 'beta',
					Stars : '23'
				},
				{
					Name : 'alpha',
					Stars : '11'
				},
				{
					Name : 'delta',
					Stars : '47'
				},
				{
					Name : 'gamma',
					Stars : '35'
				},
			];
		});
		it('should sort hotels in descending order', function () {
			var result = hotels.sort(starSorter);
			expect(result[0].Name).toBe('delta');
			expect(result[1].Name).toBe('gamma');
			expect(result[2].Name).toBe('beta');
			expect(result[3].Name).toBe('alpha');
		})
	});
});