$(function () {
	$('.typer').on('click' , function(){
		$('.search-hidden').hide();
		$('.search-input').css({display: 'flex'});
		$('.btn-link').css({display: 'inline-block'});
		$('.search-input input').focus();
	})


	$('.search-input input').on('keydown', function(e){
		var value = $('.search-input input').val();
		$('body').append('<div id="virtual_dom">' + value + '</div>'); 
		var inputWidth =  $('#virtual_dom').width() + 20; // 글자 하나의 대략적인 크기 
		$('.search-input input').css('width', inputWidth); 
		$('#virtual_dom').remove();
	});

	// docSlider.init({
	// 	speed: 600,
	// 	startSpeed: null,
	// 	easing: 'ease',
	// 	scrollReset: false,
	// 	// horizontal: true,
	// });

	// new fullpage('#fullpage', {
	// 	//options here
	// 	anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
	// 	navigation: true,
	// 	navigationTooltips:["Aaa","Aaa","Aaa","Aaa","Aaa"],
	// 	navigationPosition: 'left',
	// 	scrollBar : true,
	// 	fitToSection: false,
	// 	// Parallax :true,
	// 	autoScrolling:true,
	// 	// scrollHorizontally: true
	// 	// scrollOverflow: true 
	// });

	// new fullpage('.asdf', {
	// 	//options here
	// 	scrollBar : true,
	// 	fitToSection: false,
	// 	autoScrolling:true,
	// 	// sectionSelector: '.magazin-fullpage',
	// });
	
	$('#fullpage').fullpage({
		anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
		navigation: true,
		navigationTooltips:["Aaa","Aaa","Aaa","Aaa","Aaa"],
		navigationPosition: 'left',
		scrollBar : true,
		fitToSection: false,
		// Parallax :true,
		autoScrolling:true,
	});

	// var stack = 0;
	// $(window).on('mousewheel', function(e){
	// 	var isLast = $('.docSlider-page_3').length;
	// 	var h = $(".aa").height;
	// 	var ht = $(".aa").css('top').split('px')[0]
		
	// 	if (e.originalEvent.wheelDelta < 0) {
	// 		// scroll down 
	// 		console.log(stack)
	// 		stack+=1
	// 		if(isLast){
	// 			if( Number(ht) > 0  ){
	// 				if (stack < 100){
	// 					$(".aa").css({"transform" : 'translateY(-' + stack +'%)'});
	// 				} else {
	// 					console.log('그만')
	// 				}
	// 			}
	// 		}
	// 	} else {
	// 		//scroll up 
	// 		console.log(stack)
	// 		stack-=1
	// 		if(isLast){
	// 			if( Number(ht) < 0  ){
	// 				$(".aa").css({"transform" : 'translateY(-' + stack +'%)'});
					
	// 			}
	// 		}
	// 	}
	// })
	

	// $(".aa").css({
	// 	"transform" : "translate3d(0px, " + st  + "%, .01px)",
	// 	"-webkit-transform" : "translate3d(0px, " + st  + "%, .01px)"
	// });
})

// $(window).on('mousewheel', function (e) {
// 	e.preventDefault();
// 	if (e.originalEvent.wheelDelta < 0) {
// 		// scroll down 
// 		$('html, body').stop().animate({
// 			scrollTop: '+=250px'
// 		}, 1000);
// 	} else {
// 		//scroll up 
// 		$('html, body').stop().animate({
// 			scrollTop: '-=250px'
// 		}, 1000);
// 	}
// 	//prevent page fom scrolling 
// 	return false;
// });
