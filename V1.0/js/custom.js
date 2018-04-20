$(function() {
	$('body').scrollspy({
		target: '.navbar',
		offset: $(window).height() / 2
	});
	$('.navbar-nav>li>a').on('click', function () {
		$('.navbar-collapse').collapse('hide');
	});
	$("#navbarCollapse a").on('click', function (event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				window.location.hash = hash;
			});
		}
	});

	$('.navbar-toggler').on('click', function () {
		$('.animated-icon').toggleClass('open');
	});
	$('.nav-link').on('click', function () {
		$('.animated-icon').toggleClass('open');
	});	

    // On Scroll
	// $(window).on('scroll', function() {
	// 	var wScroll = $(this).scrollTop();

	// 	// Fixed nav
	// 	wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

	// });
});