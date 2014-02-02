(function($) {

$(function () { 
  var app = $.sammy(function () {
    this.get('#/', function(context) {
        $('#rt-main').fadeOut(function() {
            $('.bg-pags').fadeIn();
        });
    });
    this.get('#/about-us', function(context) {
        $('.bg-pags').fadeOut(function() {
            $('#rt-main').fadeIn();
        });
    });
  })
  app.run();

});

})(jQuery);
