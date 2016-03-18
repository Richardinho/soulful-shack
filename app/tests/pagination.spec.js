describe('pagination', function () {

	var maxLinks = 5;

	var pagination = require('../pagination');

	describe('when number of visible links is odd', function () {
		describe('When there are less page-links than the maximum', function () {
			var maxPageLinks = 4,
			    visibleLinksNumber = 5;
			/*
				on page 1
				1 2 3 4
				^
			*/
			describe('when on page 1', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(1, visibleLinksNumber, maxPageLinks);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(4);
					expect(paginationObj.prev).toBe(false);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 3
				1 2 3 4
				    ^
			*/
			describe('when on page 3', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(3, visibleLinksNumber, maxPageLinks);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(4);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 4
				1 2 3 4
						  ^
			*/
			describe('when on page 4', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(4, visibleLinksNumber, maxPageLinks);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(4);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(false);
				});
			});
		});
		describe('When there are more page-links than the maximum', function () {
			var pageLinksNumber = 20,
			    visibleLinksNumber = 5;
			/*
				on page 1
				1 2 3 4 5 next (1 of 20)
				^
			*/
			describe('when on page 1', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(1, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(5);
					expect(paginationObj.prev).toBe(false);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 2
				1 2 3 4 5 next (2 of 20)
				  ^
			*/
			describe('when on page 2', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(2, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(5);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 3
				1 2 3 4 5 next (3 of 20)
				    ^
			*/
			describe('when on page 3', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(3, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(5);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 4
				prev 2 3 4 5 6 next (4 of 20)
				         ^
			*/
			describe('when on page 4', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(4, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(2);
					expect(paginationObj.last).toBe(6);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 8
				prev 6 7 8 9 10 next (8 of 20)
				         ^
			*/
			describe('when on page 8', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(8, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(6);
					expect(paginationObj.last).toBe(10);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 15
				prev 13 14 15 16 17 next
				           ^
			*/
			describe('when on page 15', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(15, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(15);
					expect(paginationObj.first).toBe(13);
					expect(paginationObj.last).toBe(17);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 17
				prev 15 16 17 18 19 next
				           ^
			*/
			describe('when on page 17', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(17, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(17);
					expect(paginationObj.first).toBe(15);
					expect(paginationObj.last).toBe(19);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 18
				prev 16 17 18 19 20
				           ^
			*/
			describe('when on page 18', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(18, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(18);
					expect(paginationObj.first).toBe(16);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 19
				prev 16 17 18 19 20
				              ^
			*/
			describe('when on page 19', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(19, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(19);
					expect(paginationObj.first).toBe(16);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 20
				prev 16 17 18 19 20
				                 ^
			*/
			describe('when on page 20', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(20, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(20);
					expect(paginationObj.first).toBe(16);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(false);
				});
			});
		});
	});

	describe('when number of visible links is even', function () {
		describe('When there are less page-links than the maximum', function () {
  			var pageLinksNumber = 4,
  			    visibleLinksNumber = 6;
  			/*
  				on page 1
  				1 2 3 4
  				^
  			*/
  			describe('when on page 1', function () {
  				it('should create page object', function () {
  					var paginationObj = pagination._createPaginationObject(1, visibleLinksNumber, pageLinksNumber);
  					expect(paginationObj.first).toBe(1);
  					expect(paginationObj.last).toBe(4);
  					expect(paginationObj.prev).toBe(false);
  					expect(paginationObj.next).toBe(true);
  				});
  			});
  			/*
  				on page 3
  				1 2 3 4
  				    ^
  			*/
  			describe('when on page 3', function () {
  				it('should create page object', function () {
  					var paginationObj = pagination._createPaginationObject(3, visibleLinksNumber, pageLinksNumber);
  					expect(paginationObj.first).toBe(1);
  					expect(paginationObj.last).toBe(4);
  					expect(paginationObj.prev).toBe(true);
  					expect(paginationObj.next).toBe(true);
  				});
  			});
  		});
		describe('When there are more page-links than the maximum', function () {
			var pageLinksNumber = 20,
			    visibleLinksNumber = 6;
			/*
				on page 1
				1 2 3 4 5 6 next (1 of 20)
				^
			*/
			describe('when on page 1', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(1, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(6);
					expect(paginationObj.prev).toBe(false);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 2
				1 2 3 4 5 6 next (2 of 20)
				  ^
			*/
			describe('when on page 2', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(2, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(6);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 3
				1 2 3 4 5 6 next (3 of 20)
				    ^
			*/
			describe('when on page 3', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(3, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(1);
					expect(paginationObj.last).toBe(6);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 4
				prev 2 3 4 5 6 7 next (4 of 20)
				         ^
			*/
			describe('when on page 4', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(4, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(2);
					expect(paginationObj.last).toBe(7);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 8
				prev 6 7 8 9 10 11 next (8 of 20)
				         ^
			*/
			describe('when on page 8', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(8, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.first).toBe(6);
					expect(paginationObj.last).toBe(11);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 15
				prev 13 14 15 16 17 18 next
				           ^
			*/
			describe('when on page 15', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(15, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(15);
					expect(paginationObj.first).toBe(13);
					expect(paginationObj.last).toBe(18);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 17
				prev 15 16 17 18 19 20
				           ^
			*/
			describe('when on page 17', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(17, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(17);
					expect(paginationObj.first).toBe(15);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 18
				prev 15 16 17 18 19 20
				              ^
			*/
			describe('when on page 18', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(18, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(18);
					expect(paginationObj.first).toBe(15);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 19
				prev 15 16 17 18 19 20
				                 ^
			*/
			describe('when on page 19', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(19, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(19);
					expect(paginationObj.first).toBe(15);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(true);
				});
			});
			/*
				on page 20
				prev 15 16 17 18 19 20
				                    ^
			*/
			describe('when on page 20', function () {
				it('should create page object', function () {
					var paginationObj = pagination._createPaginationObject(20, visibleLinksNumber, pageLinksNumber);
					expect(paginationObj.current).toBe(20);
					expect(paginationObj.first).toBe(15);
					expect(paginationObj.last).toBe(20);
					expect(paginationObj.prev).toBe(true);
					expect(paginationObj.next).toBe(false);
				});
			});
		});
	});
});