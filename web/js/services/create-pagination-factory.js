+function(app){

	'use strict';

	angular.module('soulful-shack').factory('createPaginationLinks', [function () {
		return function (paginationData) {
				var totalPages = paginationData.totalPages;
				var prev = paginationData.prev;
				var next = paginationData.next;
				var first = paginationData.first;
				var last = paginationData.last;
				var currentPage = paginationData.current;
				var links = [];

				var c = first;
				while(c <= last) {
					links.push({
						text : c,
						enabled : (c !== currentPage)
					});
					c++;
				}
				links.unshift({ text : 'prev', enabled : prev});
				links.push({ text : 'next', enabled : next });
				return links;
			}
	}]);
}();