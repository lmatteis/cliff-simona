(function($) {

$(function () { 
  var app = $.sammy(function () {
    this.get('#/', function(context) {
        LoadHomeImages(function() {
            $('#rt-main').fadeOut(function() {
                $('.bg-pags').fadeIn();
            });
        });
    });
    this.get('#/about-us', function(context) {
        LoadHomeImages(function() {
            $('.bg-pags').fadeOut(function() {
                $('#rt-main').fadeIn();
            });
        });
    });
  })
  app.run('#/');

});



LoadHomeImages.loaded = false;
function LoadHomeImages(cb) {
    if(!LoadHomeImages.loaded) {
        $.getJSON('https://spreadsheets.google.com/feeds/list/0Auk-EBR1SXiBdEx2bmwtVHgxMEFNSkJ0ZVhvTzNyV2c/od6/public/values?alt=json-in-script&callback=?', function(data) {

            var $pags = $('.pags-thumbs');

            for(var i=0; i<data.feed.entry.length; i++) {
                var $li = $('<li class="even">\
                      <a class="moduleItemImage" href="#">\
                          <span class="img_container">\
                            <img src="#" alt="Slide-1"/>\
                          </span>\
                    </a>\
                  </li>');
                var imgurl = data.feed.entry[i]['gsx$homeimages']['$t'];
                var stripped = imgurl.replace('.jpg','');
                var h = stripped + 'h.jpg';
                var t = stripped + 't.jpg';

                $li.find('a').attr('href', h);
                $li.find('img').attr('src', t);

                $pags.append($li);

                
            }

            cb();
            LoadHomeImages.loaded = true;
        });
    } else {
        cb();
    }

}
})(jQuery);
