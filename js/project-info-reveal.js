$('.project_title_and_dropdown_icon svg').on('click', function(event) {
	var $arrowIcon  = $(event.currentTarget),
	    $container  = $arrowIcon.parent().parent().next(),
		$display    = $container.css('display');
		
	$container.slideToggle();
	if($display === 'none') {
		$arrowIcon.css({
			fill      : '#EE524B',
			transform : 'rotate(180deg)'
		});
	} else {
			$arrowIcon.css({
				fill      : 'rgb( 154, 146, 148 )',
				transform : 'rotate(0deg)'
			});
		}
})