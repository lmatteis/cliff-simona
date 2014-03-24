(function($) {

var currentSlug = false;

$(function () { 
  var app = $.sammy(function () {
    this.get('#/', function(context) {
        LoadData(function() {
            $('.rt-main').fadeOut(function() {
                $('.bg-pags').fadeIn();
                currentSlug = false;
            });
        });
    });
    this.get('#/:pagename', function(context) {
        var pagename = this.params['pagename'];

        LoadData(function() {
            var sel = '.bg-pags';
            if(currentSlug) { 
                sel = '#' + currentSlug;
            }
            $(sel).fadeOut(function() {
                $('#' + pagename).fadeIn();
                currentSlug = pagename;
            });
        });
    });
  })
  app.run('#/');

});

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}


function AddImage(imgurl) {

    var $li = $('<li class="even">\
          <a class="moduleItemImage" href="#">\
              <span class="img_container">\
                <img src="#" alt="Slide-1"/>\
              </span>\
        </a>\
      </li>');
    var stripped = imgurl.replace('.jpg','');
    var h = stripped + 'h.jpg';
    var t = stripped + 't.jpg';

    $li.find('a').attr('href', h);
    $li.find('img').attr('src', t);

    $('.pags-thumbs').append($li);
}

function AddPage(page) {
    var pages = page.split('\n');

    var content = '';
    for(var i=0; i<pages.length; i++) {
        if(i == 0) continue; // first is title/subtitle
        if(!pages[i]) continue;
        content += '<p>' + pages[i] + '</p>';

    }

    var titles = pages[0].split('>');
    var title = titles[0];
    if(titles[1])
        var subtitle = titles[1];

    var $rtmain = $('#rt-main');
    var $clone = $rtmain.clone();
    $clone.attr('id', convertToSlug(subtitle || title));


    $clone.find('.k2Container .componentheading h2').text(title || subtitle);
    $clone.find('.itemHeader h2.itemTitle').text(subtitle || title);
    $clone.find('.itemBody').html(content);

    if($clone.attr('id') == 'photo-gallery') {
        
        $clone.find('.itemBody p').each(function() {
            var $this = $(this);
            $this.replaceWith('<p><a href="'+$this.text()+'" target="_blank"><img class="lazy" data-original="'+$this.text()+'" ></a></p>');
        });

        $clone.find('.itemBody').append('<div class="clear">ciao</div>');
    }

    $clone.insertAfter($rtmain);


    var $ul = $('ul#left-menutop');
    var slugTitle = convertToSlug(title);

    if(!subtitle) {
        var $li = $('\
            <li class="'+slugTitle+' root" >\
                <a class="orphan item bullet" href="#/'+slugTitle+'"  >\
                    <span>'+title+'</span>\
                </a>\
            </li>\
            ');

        $ul.append($li);
    } else {
        // it's a subtitle, check if it's in the HTML already
        var li = $('li.' + slugTitle);
        var slugSubtitle = convertToSlug(subtitle);

        if(li.length) { // it exists add it
            var ulInside = li.find('ul');
            ulInside.append('\
                    <li>\
                        <a class="orphan item bullet" href="#/'+slugSubtitle+'"  >\
                            <span>'+subtitle+'</span>\
                        </a>\
                    </li>\
            ');
            
        } else { // it doesn't exist, add it
            var $li = $('\
        <li class="'+slugTitle+' parent root" >\
            <span class="daddy item bullet nolink">\
                <span>'+title+'</span>\
            </span>\
            <div class="fusion-submenu-wrapper level2" style="width:200px;">\
                <ul class="level2" style="width:200px;">\
                    <li>\
                        <a class="orphan item bullet" href="#/'+slugSubtitle+'"  >\
                            <span>'+subtitle+'</span>\
                        </a>\
                    </li>\
                </ul>\
                <div class="drop-bot"></div>\
            </div>\
        </li>\
            ');
            $ul.append($li);
        }

    }


}


LoadData.loaded = false;
function LoadData(cb) {
    if(!LoadData.loaded) {
        $.getJSON('https://spreadsheets.google.com/feeds/list/0Auk-EBR1SXiBdEx2bmwtVHgxMEFNSkJ0ZVhvTzNyV2c/od6/public/values?alt=json-in-script&callback=?', function(data) {


            for(var i=0; i<data.feed.entry.length; i++) {
                var row = data.feed.entry[i];
                
                var homeimage = row['gsx$homeimage']['$t'];
                if(homeimage)
                    AddImage(homeimage);
                    
                var page = row['gsx$page']['$t'];
                if(page)
                    AddPage(page);
                
            }
            $('img.lazy').lazyload();
            new Fusion('ul.menutop', {
                    pill: 0,
                    effect: 'slide and fade',
                    opacity:  1,
                    hideDelay:  500,
                    centered:  0,
                    tweakInitial: {'x': 227, 'y': -31},
                    tweakSubsequent: {'x':  0, 'y':  0},
                    tweakSizes: {'width': 0, 'height': 0},
                    menuFx: {duration:  300, transition: Fx.Transitions.Circ.easeOut},
                    pillFx: {duration:  400, transition: Fx.Transitions.Back.easeOut}
                });
            assignSqueeze();

            cb();
            LoadData.loaded = true;
        });
    } else {
        cb();
    }

}
})(jQuery);
