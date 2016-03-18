describe('userrating sorting strategy', function () {

	'use strict';

	var sortingStrategies = require('../sorting-strategy');

	var hotelA = {};
	var hotelB = {};

	var userRatingSorter;
	
	beforeEach (function () {
		userRatingSorter = sortingStrategies('userrating');
	});
	describe('A is less than B', function () {
		beforeEach(function () {
			hotelA.UserRating = 23;
			hotelB.UserRating = 24;
		});
		it('should return 1', function () {
			expect(userRatingSorter(hotelA, hotelB)).toBe(1);
		});
	});
	describe('A is greater than B', function () {
		beforeEach(function () {
			hotelA.UserRating = 26;
			hotelB.UserRating = 24;
		});
		it('should return -1', function () {
			expect(userRatingSorter(hotelA, hotelB)).toBe(-1);
		});
	});
	describe('A is equal to B', function () {
		beforeEach(function () {
			hotelA.UserRating = 26;
			hotelB.UserRating = 26;
		});
		it('should return 0', function () {
			expect(userRatingSorter(hotelA, hotelB)).toBe(0);
		});
	});
	describe('when an array of hotels is sorted', function () {
		var hotels;
		beforeEach(function () {
			hotels = [
				{
					Name : 'beta',
					UserRating : '23'
				},
				{
					Name : 'alpha',
					UserRating : '11'
				},
				{
					Name : 'delta',
					UserRating : '47'
				},
				{
					Name : 'gamma',
					UserRating : '35'
				},
			];
		});
		it('should sort hotels in descending order', function () {
			var result = hotels.sort(userRatingSorter);
			expect(result[0].Name).toBe('delta');
			expect(result[1].Name).toBe('gamma');
			expect(result[2].Name).toBe('beta');
			expect(result[3].Name).toBe('alpha');
		})
	});
});