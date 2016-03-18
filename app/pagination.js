function createPaginationObject (totalResults, currentPage, visiblePageLinks) {
	var totalPageLinks = Math.ceil(totalResults / visiblePageLinks);
	return _createPaginationObject(currentPage, visiblePageLinks, totalPageLinks);
}

function _createPaginationObject (currentPage, visiblePageLinks, maxPageLinks){

	var prev, next, first, last;

	currentPage = parseInt(currentPage, 10);
	visiblePageLinks = parseInt(visiblePageLinks, 10);
	maxPageLinks = parseInt(maxPageLinks, 10);
	if(maxPageLinks < visiblePageLinks) {

		return  {
			current : currentPage,
			prev : false,
			next : false,
			first : 1,
			last : maxPageLinks,
			totalPages : maxPageLinks
		};
	}

	if(isOdd(visiblePageLinks)) {
		var offset = Math.floor(visiblePageLinks / 2);

		if(currentPage > offset) {
			first = currentPage - offset;
			last = currentPage + offset;
			if(last > maxPageLinks) {
				last = maxPageLinks;
				first = last - visiblePageLinks + 1;
			}
		} else {
			first = 1;
			last = visiblePageLinks;
		}
	} else {
		var offset = visiblePageLinks / 2;
		var leftOffset = offset - 1;
		var rightOffset = offset;
		if(currentPage > leftOffset) {
			first = currentPage - leftOffset;
			last = currentPage + rightOffset;
			if(last > maxPageLinks) {
				last = maxPageLinks;
				first = last - visiblePageLinks + 1;
			}
		} else {
			first = 1;
			last = visiblePageLinks;
		}
	}

	prev = !!(first !== 1);
	next = !!(last < maxPageLinks);

	var paginationObj= {
		current : currentPage,
		prev : prev,
		next : next,
		first : first,
		last : last,
		totalPages : maxPageLinks
	};

	return paginationObj;

}

function isOdd(number) {
	return !!(number % 2);
}
module.exports.createPaginationObject = createPaginationObject;
module.exports._createPaginationObject = _createPaginationObject;

