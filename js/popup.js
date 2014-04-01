var service = analytics.getService('BreakpointTester');
var tracker = service.getTracker('UA-12477767-4');

tracker.sendAppView('Popup');

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
			width = (parseInt(width) + 16);

		tracker.sendEvent('Preset', ((width - 16) + 'px'));

		updateWindow({ width: parseInt(width), height: parseInt(screen.availHeight), top: 0, left: 0 });
	});

	$('#customSet').on('click', function() {
		var width = (parseInt($('#customBreakpoint').val()) + 16);

		tracker.sendEvent('Custom', (width - 16) + 'px');

		updateWindow({ width: width, height: screen.availHeight, top: 0, left: 0 });
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

	tracker.sendEvent('Resize', ((parseInt(options.width) - 16) + 'px'));
}