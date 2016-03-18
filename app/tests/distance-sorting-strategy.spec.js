describe('distance sorting strategy', function () {

	'use strict';

	var sortingStrategies = require('../sorting-strategy');

	var hotelA = {};
	var hotelB = {};

	var distanceRatingSorter;
	
	beforeEach (function () {
		distanceRatingSorter = sortingStrategies('distance');
	});
	describe('A is less than B', function () {
		beforeEach(function () {
			hotelA.Distance = 23;
			hotelB.Distance = 24;
		});
		it('should return -1', function () {
			expect(distanceRatingSorter(hotelA, hotelB)).toBe(-1);
		});
	});
	describe('A is greater than B', function () {
		beforeEach(function () {
			hotelA.Distance = 26;
			hotelB.Distance = 24;
		});
		it('should return 1', function () {
			expect(distanceRatingSorter(hotelA, hotelB)).toBe(1);
		});
	});
	describe('A is equal to B', function () {
		beforeEach(function () {
			hotelA.Distance = 26;
			hotelB.Distance = 26;
		});
		it('should return 0', function () {
			expect(distanceRatingSorter(hotelA, hotelB)).toBe(0);
		});
	});
	describe('when an array of hotels is sorted', function () {
		var hotels;
		beforeEach(function () {
			hotels = [
				{
					Name : 'beta',
					Distance : '23'
				},
				{
					Name : 'alpha',
					Distance : '11'
				},
				{
					Name : 'delta',
					Distance : '47'
				},
				{
					Name : 'gamma',
					Distance : '35'
				},
			];
		});
		it('should sort hotels in ascending order', function () {
			var result = hotels.sort(distanceRatingSorter);
			expect(result[0].Name).toBe('alpha');
			expect(result[1].Name).toBe('beta');
			expect(result[2].Name).toBe('gamma');
			expect(result[3].Name).toBe('delta');
		})
	});
});