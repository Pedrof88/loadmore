jQuery(function ($) {
	$('.custom_loadmore').click(function () {

		var button = $(this),
			data = {
				'action': 'loadmore',
				'query': custom_loadmore_params.posts, // that's how we get params from wp_localize_script() function
				'page': custom_loadmore_params.current_page
			};

		$.ajax({
			url: custom_loadmore_params.ajaxurl, // AJAX handler
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.text('Loading...'); // change the button text, you can also add a preloader image
			},
			success: function (data) {
				if (data) {
					button.text('More posts').prev().before(data); // insert new posts
					custom_loadmore_params.current_page++;

					if (custom_loadmore_params.current_page == custom_loadmore_params.max_page)
						button.remove(); // if last page, remove the button

					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );
				} else {
					button.remove(); // if no data, remove the button as well
				}
			}
		});
	});
});

jQuery(function ($) {
	$('#test').change(function () {
		var filter = $('#filter');
		$.ajax({
			url: filter.attr('action'),
			data: filter.serialize(), // form data
			type: filter.attr('method'), // POST
			success: function (data) {
				$('#response').html(data); // insert data
			}
		});
		return false;
	});
});
