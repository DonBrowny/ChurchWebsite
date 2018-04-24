$(function () {
	let videoArray = new Array();
	const getVideoId = (array) => {return array[0] };
	const getVideoTitle = (array) => {return array[1] };
	const getVideoImg = (array) => {return array[2] };
	const embedURL = (videoId) => { return "https://www.youtube.com/embed/" + videoId};
	const viewURL = (videoId) => { return "https://www.youtube.com/watch?v=" + videoId};
	
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
	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/search",
		datatype: "json",
		data: {
			part: 'snippet',
			channelId: 'UC8YADFpAa4BFBSYUmkYwWvA',
			maxResults: 10,
			order: 'date',
			type: 'video',
			fields:'items(id/videoId,snippet(thumbnails/high/url,title))',
			key: 'AIzaSyBlq5YOCz42CLmQIDCfny0xrcOyaDCFQgA'
		},
		success: function (data) {
			var list = data.items;
			for (let index = 0; index < list.length; index++) {
				const element = list[index];
				let tempArray = new Array(element.id.videoId,element.snippet.title,element.snippet.thumbnails.high.url);				
				videoArray.push(tempArray);
			}
			setMainVideoSrc(embedURL( getVideoId(videoArray[0])));
			setMainVideoTitle( getVideoTitle(videoArray[0]));
		}
	});
});

function setMainVideoSrc(url){
	let videoDiv = document.getElementById('latest-video');
	videoDiv.src = url;
}

function setMainVideoTitle(title){
	let titleDiv = document.getElementById('videoTitle');
	console.log(titleDiv);
	titleDiv.innerText = title;
}
