var service = analytics.getService('BreakpointTester'),
	tracker = service.getTracker('UA-12477767-4'),

	history = [],
	preferences = {
		prefer: 	'left',
		height: 	screen.availHeight,
		top: 		0,
		left: 		0,
		right: 		0
	};
	
	tracker.sendAppView('Popup');

$(document).on('ready', function() {
	chrome.storage.sync.get('history', function(obj) {
		if (obj.history) {
			history = obj.history;

			updateHistory();
		}
	});

	chrome.windows.getCurrent(null, function(window) {
		preferences.height = ((window.state == "maximized") ? parseInt(screen.availHeight) : parseInt(window.height));
		preferences.top = ((window.state == "maximized") ? 0 : parseInt(window.top));

		if (window.state == "maximized") {
			preferences.prefer = 'left';
			preferences.left = 0;
			preferences.top = 0;
		}
		else if (parseInt(window.left) == 0) {
			preferences.prefer = 'left';
		}
		else if ((parseInt(window.left) % (screen.availWidth)) == 0) {
			preferences.prefer = 'left';
			preferences.left = parseInt(window.left);
		}
		else if ((Math.abs(parseInt(window.left)) - parseInt(window.width)) == 0) {
			preferences.prefer = 'right';
			preferences.right = (parseInt(window.left) + parseInt(window.width));
		}

		updateSlider(window.width);
	});

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

	$(".preset").on('click', function() {
		var width = $(this).attr('data-width');
			width = (parseInt(width) + 16);

		tracker.sendEvent('Preset', ((width - 16) + 'px'));

		updateWindow({ width: parseInt(width) });
	});

	$('#customSet').on('click', function() {
		var width = (parseInt($('#customBreakpoint').val()) + 16);

		tracker.sendEvent('Custom', (width - 16) + 'px');

		updateWindow({ width: parseInt(width) });
	})
});

function updateSlider(width) {
	$('#customBreakpoint').val(parseInt((width - 16)), { set: true, animate: true });
}

function updateSliderText() {
	$('#customValue').text(parseInt($('#customBreakpoint').val()) + 'px');
}

function updateWindow(options) {
	if (preferences.prefer == 'left') {
		options.left = preferences.left;
	}
	else if (preferences.prefer == 'right') {
		options.left = (preferences.right - options.width);
	}

	options.top = preferences.top;

	options.height = preferences.height;

	chrome.windows.getCurrent(null, function(window) {
	     chrome.windows.update(
	     	window.id,
	     	options,
	     	function(response) {}
	     );
	});

	// Push on to the front of the array
	history.unshift(parseInt(options.width) - 16);

	// Trim the length of the array so it's always <= 5
	history = history.filter(function(value, index) {
		return (index < 5);
	});

	chrome.storage.sync.set({ history: history });

	updateHistory();
}

function updateHistory() {
	$ul = $("#left ul");
	$ul.empty();

	history.forEach(function(value, index) {
		$ul.append('<li>' + value + 'px</li>');
	});

	$("#left ul li").off("click").on("click", function(event) {
		var width = parseInt($(this).text().replace('px', ''));
		tracker.sendEvent('History', width + 'px');

		updateWindow({ width: (width + 16) });
	});
}