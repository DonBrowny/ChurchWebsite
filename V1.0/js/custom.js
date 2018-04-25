$(function () {
	let videoArray = new Array();
	const getVideoId = (array) => {
		return array[0]
	};
	const getVideoTitle = (array) => {
		return array[1]
	};
	const getVideoImg = (array) => {
		return array[2]
	};
	const embedURL = (videoId) => {
		return "https://www.youtube.com/embed/" + videoId
	};
	const viewURL = (videoId) => {
		return "https://www.youtube.com/watch?v=" + videoId
	};
	const setAnchorTag = (videoId, title, imageId) => {
		return '<div class="d-flex flex-column flex-item"><div class="video-title">'+ title +'</div><a class="video-link" href="' + videoId + '" title="' + title + 
		'"><img class="video-thumbnails" src="' + imageId + '"></a></div>';
	};

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
			fields: 'items(id/videoId,snippet(thumbnails/high/url,title))',
			key: 'AIzaSyBlq5YOCz42CLmQIDCfny0xrcOyaDCFQgA'
		},
		success: function (data) {
			var list = data.items;
			let dynamicLinks = '';
			for (let index = 0; index < list.length; index++) {
				const element = list[index];
				let tempArray = new Array(element.id.videoId, element.snippet.title, element.snippet.thumbnails.high.url);
				videoArray.push(tempArray);
				dynamicLinks += setAnchorTag( viewURL(element.id.videoId), element.snippet.title, element.snippet.thumbnails.high.url)
			}
			setMainVideoSrc(embedURL(getVideoId(videoArray[0])));
			setMainVideoTitle(getVideoTitle(videoArray[0]));
			console.log(dynamicLinks);
			let videoDIV = document.getElementById('videoContent');
			videoDIV.innerHTML = dynamicLinks;			
		}
	});	
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		},
		callbacks: {
			elementParse: function (item) {
				// the class name
				if (item.el[0].className == 'video-link') {
					item.type = 'iframe';
				} else {
					item.type = 'image';
				}
			}
		}
	});
});

function setMainVideoSrc(url) {
	let videoDiv = document.getElementById('latest-video');
	videoDiv.src = url;
}

function setMainVideoTitle(title) {
	let titleDiv = document.getElementById('videoTitle');
	console.log(titleDiv);
	titleDiv.innerText = title;
}
