(function($) {

var app = $.sammy('#main', function() {

    this.get('#/', function(context) {
        context.log('Yo yo yo');
    });

});

$(function() {
    app.run('#/');
});

})(jQuery);
