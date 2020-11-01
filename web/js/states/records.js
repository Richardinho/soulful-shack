+function (app) {

	'use strict';

	var ratings = [
		[],[{}],[{},{}],[{},{},{}],[{},{},{},{}],[{},{},{},{},{}]
	];

	function createUrlParamsFromFilters(filters, page) {
		var pageNumber;
		if (page) {
			pageNumber = page
		} else {
			pageNumber = filters.page;
		}

		return {
			page       : pageNumber,
			mincost    : filters.mincost.val,
			userrating : filters.userrating.val,
			stars      : filters.stars.val,
			sortby     : filters.sortby
		};
	}

	app.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('records.summaries', {
				url : '/summaries',
				resolve : {
					/* filters and sort options used by both refinements and pagination */
					refinements : function(serverData, createRefinements) {
						return createRefinements(serverData.data.filterdata, serverData.data.PaginationData.current);
					}
				},
				views : {

					'menu' : {
						templateUrl : 'partials/refinements.html',
						controller : function ($scope, $state, serverData, refinements) {
							var page = 1;

							$scope.filters = refinements;

							$scope.refresh = function () {
								var filterData = createUrlParamsFromFilters($scope.filters, 1)
								$state.go('records.summaries', filterData);
							}
						}
					},
					'pagination' : {
						templateUrl : 'partials/pagination.html',
						controller : ['$scope', 'serverData', '$state', 'refinements', 'createPaginationLinks',
							function($scope, serverData, $state, refinements, createPaginationLinks) {

								$scope.pagination = createPaginationLinks(serverData.data.PaginationData);
								$scope.currentPage = serverData.data.PaginationData.current;
								$scope.totalPages = serverData.data.PaginationData.totalPages;

								$scope.changePage = function(requestedPage, enabled) {
									if(enabled) {
										if(requestedPage == 'prev') {
											requestedPage = parseInt(serverData.data.PaginationData.current, 10) - 1;
										} else if(requestedPage == 'next') {
											requestedPage = parseInt(serverData.data.PaginationData.current, 10) + 1;
										}
										refinements.page = requestedPage;
										$state.go('records.summaries', createUrlParamsFromFilters(refinements));
									}
								}
							}]
					},
					'results' : {
						templateUrl : 'partials/record-summaries.html',
						controller : function($scope, serverData){
							$scope.recordDetails = serverData.data.Establishments;
							$scope.getStars = function (rating) {
								return ratings[rating];
							};
						}
					}
				}
			});
	}]);
}(angular.module('soulful-shack'));
