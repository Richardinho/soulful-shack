describe("minprice sorting strategy", function () {
	"use strict";

	var sortingStrategies = require("../sorting-strategy");

	var hotelA = {};
	var hotelB = {};

	var minCostSorter;

	beforeEach(function () {
		minCostSorter = sortingStrategies("mincost");
	});
	describe("A is less than B", function () {
		beforeEach(function () {
			hotelA.MinCost = 23;
			hotelB.MinCost = 24;
		});
		it("should return -1", function () {
			expect(minCostSorter(hotelA, hotelB)).toBe(-1);
		});
	});
	describe("A is greater than B", function () {
		beforeEach(function () {
			hotelA.MinCost = 26;
			hotelB.MinCost = 24;
		});
		it("should return 1", function () {
			expect(minCostSorter(hotelA, hotelB)).toBe(1);
		});
	});
	describe("A is equal to B", function () {
		beforeEach(function () {
			hotelA.MinCost = 26;
			hotelB.MinCost = 26;
		});
		it("should return 0", function () {
			expect(minCostSorter(hotelA, hotelB)).toBe(0);
		});
	});
	describe("when an array of hotels is sorted", function () {
		var hotels;
		beforeEach(function () {
			hotels = [
				{
					Name: "beta",
					MinCost: "23",
				},
				{
					Name: "alpha",
					MinCost: "11",
				},
				{
					Name: "delta",
					MinCost: "47",
				},
				{
					Name: "gamma",
					MinCost: "35",
				},
			];
		});
		it("should sort hotels in ascending order", function () {
			var result = hotels.sort(minCostSorter);
			expect(result[0].Name).toBe("alpha");
			expect(result[1].Name).toBe("beta");
			expect(result[2].Name).toBe("gamma");
			expect(result[3].Name).toBe("delta");
		});
	});
});
