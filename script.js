$(window).scroll(function(){
	if($(window).scrollTop() >= 300) {
		$('titlesection').addClass('sticky');
	} else {
		$('titlesection').removeClass('sticky');
	}
});

$('titlesection').click(function(event) {
	var id = $(this).attr("href");
	var offset = 100;
	var target = $(id).offset().top - offset;
	$('html, body').animate({
		scrollTop: target });
});
