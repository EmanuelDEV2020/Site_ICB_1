(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	// Page
	var atos6NewsPage = 1;

	$(function() {

		$('#atos6_news_load_more').on('click', function(){
			
			atos6NewsPage++;
			console.log(atos6NewsPage);
			$('.btn-atos6-news .spinner-border').css('display','inline-block');
			ajax_render_archive_page(atos6NewsPage);

		});

		// Call first page news
		
		if( $('#atos6_news').length > 0 ) {
			ajax_render_archive_page(atos6NewsPage);
		}
		
		// Call carrousel

		if( $('#atos6_news_carousel').length > 0 ) {
			ajax_render_archive_page(1,8,'#atos6_news_carousel');
		}

		// Call single last news

		if( $('#atos6_last_news').length > 0 ) {
			ajax_render_archive_page(1,4,'#atos6_last_news');
		}

	});
	
	// Ajax load archive news function

	function ajax_render_archive_page(page=1,per_page=0,target='#atos6_news'){

		console.log(target);

		$.ajax({
			url: atos6_news_ajax_obj.ajaxurl,
			data: {
				'action': 'get_atos6_news_archive_view',
				'page' : page,
				'per_page' : per_page,
				'category_id' : atos6_news_ajax_obj.category_id,
				'target' : target
			},
			success:function(data) {
		
				// Success
				$(target).append(data);
				$('.atos6-loader').hide();
				$('.btn-atos6-news .spinner-border').hide();
				if(! data ){
					if( page == 1 ){
						$('.atos6-nav').html("Nenhum registro foi encontrado.");
					}else{
						$('.atos6-nav').html("Todos registros já foram carregados.");
					}
				}

				//Select2
				if(jQuery.fn.select2){
					$('.at6-select').select2({
						width: 'resolve'
					});
				}

				// Select redirection
				$('#atos6_news_categories').on('change', function(){
					let target_href = $(this).val();
					if( target_href ){
						window.location.href = target_href;
					}
				});

				// Show load more button

				$('#atos6_news_load_more').show();
				
				// Slick
				if( target == '#atos6_news_carousel' ){
					$('#atos6_news_carousel').slick({
						dots: true,
  					infinite: false,
						speed: 300,
						slidesToShow: 4,
						slidesToScroll: 4,
						variableWidth: false,
						responsive: [
							{
							  breakpoint: 800,
							  settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							  }
							},
							{
							  breakpoint: 480,
							  settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							  }
							}
						  ]
					});
				}
			},
			error: function(xhr, status, error){
		
				// Erro
				var errorMessage = xhr.status + ': ' + xhr.statusText
				console.log('Error: ' + errorMessage);
				$('.atos6-loader').hide();
				$('.btn-atos6-news .spinner-border').hide();
			}
		});
	}

})( jQuery );
