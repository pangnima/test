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
	var fullPageCreated = false;
	function createFullpage() {
		if(fullPageCreated === false){
			fullPageCreated = true;
			$('#fullpage').fullpage({
				anchors:['search', 'filter' ,'magazine-1','magazine-2','info'],
				navigation: true,
				navigationTooltips:["홈","필터","매거진","매거진-하","플립은"],
				navigationPosition: 'left',
				scrollBar : true,
				fitToSection: false,
				Parallax :true,
				autoScrolling:true,
				verticalCentered:true
			});
		}
	}

	createFullpage();
	// $.fn.fullpage.setMouseWheelScrolling(false);
	var isVisible = false;

	$(window).on('mousewheel DOMMouseScroll' , function(e){
		var scrollT =$(window).scrollTop()
		if(scrollT > 5316){
			$.fn.fullpage.setMouseWheelScrolling(false);
			if (e.originalEvent.wheelDelta < 0) {
				// scroll down 
				$('.scroll-page').stop().animate({
					top: '-=250px'
				}, 350 );
			} else {
				//scroll up 
				$('.scroll-page').stop().animate({
					top: '+=250px'
				}, 350 );
			}
		} else{
			// createFullpage();
			$.fn.fullpage.setMouseWheelScrolling(true);
		}

		if (checkVisible($('.logo-action'))&&!isVisible) {
			// alert("Visible!!!");
			for(let i=0, len=300; i<len; i++ ){
				setTimeout(function(){
					$('.imgAction').attr('src',`../fuleaf/images/logo/logo_${i}.png`)
				},20*i)
			}
			isVisible=true;
		}


		if($('#fp-nav ul li:nth-child(4)').children().hasClass('active')){
			$('#fp-nav ul li:nth-child(3)').children().addClass('active')
		}


		// // console.log()
		// if(scrollT>$('.actions').offset().top-300){
		// 	$('.actions').stop().animate({
		// 		'background-position-y' : -($(window).scrollTop()-$('.actions').offset().top) /10
		// 	},500)
		// }
	})


	function checkVisible( elm, eval ) {
		eval = eval || "object visible";
		var viewportHeight = $(window).height(), // Viewport Height
			scrolltop = $(window).scrollTop(), // Scroll Top
			y = $(elm).offset().top,
			elementHeight = $(elm).height();   
		
		if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
		if (eval == "above") return ((y < (viewportHeight + scrolltop)));
	}
	
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
