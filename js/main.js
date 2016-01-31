/* ==========================================================================
   FULL SCREEN HEADER 
   ========================================================================== */

function level_up_min_height() {
  var window_height = $(window).height();
  $(".lavel-up-header, .lavel-up-color-overlay").css('min-height', window_height); 
  
}

$(document).ready(function() {
  level_up_min_height();
  $(window).bind('resize', level_up_min_height);
});




/* ==========================================================================
   STELLAR   
   ========================================================================== */

$(window).stellar({ 
	horizontalScrolling: false 
});



/* ==========================================================================
   Countdown
   ========================================================================== */

$(function() {
	var endDate = "January 26, 2016 20:39:00";
	$('.lu-countdown').countdown({
		date: endDate,
		render: function(data) {
			$(this.el).html('<div class="col-xs-6 col-sm-6 col-md-3 lu-countdown-item lu-days"><div class="lu-square"><span>' + this.leadingZeros(data.days, 2) + '</span><span>Days</span></div></div><div class="col-xs-6 col-sm-6 col-md-3 lu-countdown-item lu-hours"><div class="lu-square"><span>' + this.leadingZeros(data.hours, 2) + '</span><span>Hours</span></div></div><div class="col-xs-6 col-sm-6 col-md-3 lu-countdown-item lu-minutes"><div class="lu-square"><span>' + this.leadingZeros(data.min, 2) + '</span><span>Minutes</span></div></div><div class="col-xs-6 col-sm-6 col-md-3 lu-countdown-item lu-seconds"><div class="lu-square"><span>' + this.leadingZeros(data.sec, 2) + '</span><span>Seconds</span></div></div>');
		}
	});
});




