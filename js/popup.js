$(document).on('ready', function() {
	$('#version span').text("v" + chrome.runtime.getManifest().version);

	$('#customBreakpoint').noUiSlider({
		start: 320,
		step: 5,
		range: {
			"min": 320,
			"max": parseInt(screen.availWidth)
		},
		connect: "lower"
	});

	$('#customBreakpoint').on('change', updateSliderText);
	$('#customBreakpoint').on('set', updateSliderText);
	$('#customBreakpoint').on('slide', updateSliderText);

	chrome.windows.getCurrent(null, function(window) {
		updateSlider(window.width);
	});

	$(".preset").on('click', function() {
		var width = $(this).attr('data-width');
			width = (parseInt(width) + 16); // Add 16px to account for the border around the chrome window.

		updateWindow({ width: parseInt(width), height: parseInt(screen.availHeight), top: 0, left: 0 });
	});

	$('#customSet').on('click', function() {
		updateWindow({ width: (parseInt($('#customBreakpoint').val()) + 16), height: screen.availHeight, top: 0, left: 0 });
	})
});

function updateSlider(width) {
	$('#customBreakpoint').val(parseInt((width - 16)), { set: true, animate: true });
}

function updateSliderText() {
	$('#customValue').text(parseInt($('#customBreakpoint').val()) + 'px');
}

function updateWindow(options) {
	chrome.windows.getCurrent(null, function(window) {
	     chrome.windows.update(
	     	window.id,
	     	options,
	     	function(response) {}
	     );

	     updateSlider(options.width);
	});
}