function animated_contents() {
	$(".animated").each(function (i) {
		var $this    = $(this),
			animated = $(this).data('animated');

		setTimeout(function () {
			$this.addClass(animated);
		}, 100 * i);
	
	});
}
jQuery(document).ready(function() {
	animated_contents();		
});

