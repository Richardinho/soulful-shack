describe('Protractor Demo App', function() {


  describe('Protractor Demo App', function() {
    it('should have a title', function() {
      browser.get('http://localhost:5000/records/summaries');

      expect(browser.getTitle()).toEqual('The Soulful Shack UI Router');
    });
  });
});
