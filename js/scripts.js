jQuery(document).ready(function($) {
	$('ul li:last-child').addClass('lastItem');
	$('ul li:first-child').addClass('firstItem');
	
/*ScrollToTop button*/
	$(function() {
		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$('.rt-block.totop').fadeIn();	
			} else {
				$('.rt-block.totop').fadeOut();
			}
		});
	});
	
/*Avoid input bg in Chrome*/
	if ($.browser.webkit) {
		$('input').attr('autocomplete', 'off');
	}
	
/*Zoom Icon. Portfolio page*/
	$('a.modal.img').hover(function(){
		$(this).find('img').stop(true, true).animate({opacity:.5}, 200).next().stop().animate({top: '50%'}, 200);
	},function(){
		$(this).find('img').stop(true, true).animate({opacity: 1}, 200).next().stop().animate({top: '-50%'}, 200);
	})
$('.menu_button').toggle(function(){$('.menu_holder').css({zIndex:20});$('#rt-menu').animate({top:-350});$('.collapse').hide();$('.expand').show()},function(){$('#rt-menu').animate({top:0},500,function(){$('.menu_holder').css({zIndex:0})});$('.collapse').show();$('.expand').hide()})
/*Pagination Active Button*/
	$('.k2Pagination ul li:not([class])').addClass('num');
	$('div.pagination ul li:not([class])').addClass('num');	
	$('div.itemCommentsPagination ul li:not([class])').addClass('num');
	function set_smile(){
		if($('body').width()<1180){$('div.smile').stop().animate({right:-90},200)}
		else{$('div.smile').stop().animate({right:-10},200)}
	}
	if($('body').width()<1180){$('div.smile').css({right:-90})}
	$(window).resize(function(){
		set_smile()
	})
	$('div.smile').hover(function(){
		if($('body').width()>=1180){$(this).stop().animate({right:0},200)}
	},function(){
		if($('body').width()>=1180){$(this).stop().animate({right:-10},200)}
	})
});