$(document).on('ready', function() {
	$(".preset").on('click', function(event) {
		var width = $(this).attr('data-width');

		chrome.windows.getCurrent(null, function(window) {
		     chrome.windows.update(window.id, { width: parseInt(width) }, function(response) {});
		});
	});
});