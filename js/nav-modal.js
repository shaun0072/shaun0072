$(document).ready(function(){
	$('#hamburger-icon').click(function(){
		$(this).toggleClass('open');
		var $overlay = $('#nav_overlay'),
			$headerBG = $('header');
		$headerBG.css('background', '#d8d8d8');
		if($overlay.css('display') ===  'none') {
			$overlay.css('display', 'flex').hide().fadeIn(100, function() {
				$('.nav_item:nth-child(1)').animate({
								opacity  : 1
							  }, 100);
				$('.nav_item:nth-child(2)').animate({
								opacity  : 1
							  }, 200);
				$('.nav_item:nth-child(3)').animate({
								opacity  : 1
							  }, 300);
				$('.nav_item:nth-child(4)').animate({
								opacity  : 1
							  }, 400);
							  
			});
			
		}else {
			$headerBG.css('background', '#221E1F');
			$('.nav_item').animate({
							opacity  :  0				
						  }, 100, function() {
			$overlay.delay(50).fadeOut();				  
			});
			
		}
	});
});