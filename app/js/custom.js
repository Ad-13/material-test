;(function($) {
	"use strict";

/* --------------- DOM ELEMENTS --------------- */
	var $mainSlider = $('#main-slider'),
		$mainSliderArrs = $('#main-slider-arrs'),
		$datePicker = $('#datepicker'),
		$regForm = $('#reg-form'),
		$cardWeather = $('#card-weather'),
		$sideNavBtn = $('.button-collapse'),
		$rangeMono = document.getElementById('range-slider-mono'),
		$rangeDual = document.getElementById('range-slider-dual');

/* --------------- CALENDAR --------------- */
	$datePicker.datepicker({
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		firstDay: 1
	});

/* --------------- MASONRY GRID --------------- */
	$(window).on('load', function () {
		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: 10
		});
	});

/* --------------- MOB SIDE MENU --------------- */
	 $sideNavBtn.sideNav();


/* --------------- MAIN SLIDER --------------- */
	$mainSlider.carousel({
		fullWidth: true,
		indicators: true
	});

	$mainSliderArrs.on('click', '.carousel-arr', function (e) {
		e.preventDefault();
		e.stopPropagation();

		if ( $(this).hasClass('carousel-next') ) {
			$mainSlider.carousel('next');
		} else {
			$mainSlider.carousel('prev');
		}
	});

/* --------------- RANGE SLIDERS --------------- */
	noUiSlider.create($rangeMono, {
		start: 40,
		connect: [true, false],
		range: {
			'min': 0,
			'max': 100
		},
		step: 1,
		orientation: 'horizontal',
		format: wNumb({
			decimals: 0
		})
	});

	noUiSlider.create($rangeDual, {
		start: [20, 80],
		connect: true,
		step: 1,
		orientation: 'horizontal',
		range: {
			'min': 0,
			'max': 100
		},
		format: wNumb({
			decimals: 0
		})
	});

/* --------------- REGISTRATION FORM --------------- */
	$regForm.validate({
		rules: {
			username: 'required',
			password: 'required',
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			username: 'Please specify your name',
			password: 'Please specify password',
			email: {
				required: 'Please type correct email format ',
				email: 'Please use correct email format'
			}
		}
	});

/* --------------- WEATHER CHANGE --------------- */
	$cardWeather.on('click', '.temp-format__item', function () {
		$(this).parent().find('.temp-format__item').removeClass('active');
		$(this).addClass('active');
		if ( $(this).hasClass('cesium') ) {
			$(this).closest('.card-weather__day').find('.day-main__temp .num').removeClass('active');
			$(this).closest('.card-weather__day').find('.day-main__temp .num.cesium').addClass('active');
		} else {
			$(this).closest('.card-weather__day').find('.day-main__temp .num').removeClass('active');
			$(this).closest('.card-weather__day').find('.day-main__temp .num.fahrenheit').addClass('active');
		}
	});

})(jQuery);
