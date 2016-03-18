function createPaginationObject (totalResults, currentPage, visiblePageLinks) {
	var totalPageLinks = Math.ceil(totalResults / visiblePageLinks);
	return _createPaginationObject(currentPage, visiblePageLinks, totalPageLinks);
}

function _createPaginationObject (currentPage, visiblePageLinks, totalPageLinks){

	var prev, next, first, last;

	currentPage = parseInt(currentPage, 10);
	visiblePageLinks = parseInt(visiblePageLinks, 10);
	totalPageLinks = parseInt(totalPageLinks, 10);
	if(totalPageLinks < visiblePageLinks) {
		next = !!(last < totalPageLinks);
		return  {
			current : currentPage,
			prev : currentPage != 1,
			next : currentPage != totalPageLinks,
			first : 1,
			last : totalPageLinks,
			totalPages : totalPageLinks
		};
	}

	if(isOdd(visiblePageLinks)) {
		var offset = Math.floor(visiblePageLinks / 2);

		if(currentPage > offset) {
			first = currentPage - offset;
			last = currentPage + offset;
			if(last > totalPageLinks) {
				last = totalPageLinks;
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
			if(last > totalPageLinks) {
				last = totalPageLinks;
				first = last - visiblePageLinks + 1;
			}
		} else {
			first = 1;
			last = visiblePageLinks;
		}
	}

	prev = !!(currentPage !== 1);
	next = !!(currentPage !== totalPageLinks);

	var paginationObj= {
		current : currentPage,
		prev : prev,
		next : next,
		first : first,
		last : last,
		totalPages : totalPageLinks
	};

	return paginationObj;

}

function isOdd(number) {
	return !!(number % 2);
}
module.exports.createPaginationObject = createPaginationObject;
module.exports._createPaginationObject = _createPaginationObject;

