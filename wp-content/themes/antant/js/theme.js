"use strict";
/* Fix Elementor Animation */
document.addEventListener("DOMContentLoaded", function(event) {
	document.body.classList.add('page-loaded');
});

var header = jQuery('.main_header'),
	footer = jQuery('.main_footer'),
	main_wrapper = jQuery('.main_wrapper'),
	nav = jQuery('nav.main_nav'),
	menu = nav.find('ul.menu'),
	html = jQuery('html'),
	body = jQuery('body'),
	myWindow = jQuery(window),
	windowWidth = myWindow.outerWidth();

Number.prototype.pad = function (n) {
	if (n === undefined) n = 2;
	var length = this.toString().length;
	if (length > n) n = length;

	return (new Array(n).join('0') + this).slice(-n);
};
jQuery(document).ready(function ($) {

	var ie = (function () {
		var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			) ;
		return v > 4 ? v : undef;
	}());
	if (ie === 9) jQuery('body').addClass('ie_9');

    // GT3_Preloader
    var preloader_glob = document.querySelector('.gt3_preloader');
    var preloader_glob_data = 'none';
    if (preloader_glob !== null) {
        preloader_glob_data = preloader_glob.dataset.loading_type;
    }

    if (preloader_glob_data === 'linear') {
        (function gt3_preloader() {
            setTimeout(function () {
                jQuery('.gt3_linear-loading').fadeOut();
            }, 8000);
        }());
    } else if (preloader_glob_data === 'circle') {
        (function () {

            var loaderDashoffsetTotal = preloader_glob.dataset.circle_l;
            var preloader = preloader_glob.querySelector('.gt3_circle-preloader');
            var preloaderOuter = preloader.querySelector('.gt3_circle-outer');
            var logo = preloader.querySelector('.gt3_circle-logo');
            var loaded = 0;
            var total = 50;

            function onProgress() {
                var percentLoaded = Math.round((loaded / total) * 100);
                var calc = (loaderDashoffsetTotal / 100);
                var percent = Math.round(calc * percentLoaded);
                var offset = loaderDashoffsetTotal - percent;
                preloaderOuter.style.strokeDashoffset = offset + 'px';
            }

            function init() {
                preloaderOuter.style.strokeDashoffset = loaderDashoffsetTotal + 'px';
                preloaderOuter.style.opacity = 1;
                setTimeout(function () {
                    preloaderOuter.style.strokeDashoffset = (loaderDashoffsetTotal) + 'px';
                    jQuery(preloaderOuter).addClass('gt3_circle-loading');
                    load();
                }, 500);
            }

            init();

            function load() {
                loaded++;
                onProgress();
                if (loaded < 45 && preloader_glob.classList.contains('gt3_circle-load_done')) loaded = 45;

                if (loaded === total) {
                    setTimeout(onDone, 1000);
                } else {
                    setTimeout(load, 100);
                }
            }

            function onDone() {
                jQuery(preloader).addClass('gt3_circle-out');
                jQuery(logo).removeClass('gt3_circle-fade_in');
                jQuery(logo).addClass('gt3_circle-fade_out');
                setTimeout(function () {
                    jQuery(preloader_glob).fadeOut()
                }, 500);
            }
        })();
    } else if (preloader_glob_data === 'theme') {
        (function gt3_preloader() {
            setTimeout(function () {
                jQuery('.gt3_theme_prl-loading').fadeOut();
            }, 8000);
        }());
    }

	init_slick_post_gallery();
	gt3_search();
	gt3_mobile_menu();
	gt3_burger_sidebar();
	gt3_modal_login();
	gt3_message_close();
	gt3_back_to_top();
	gt3_mega_menu();
	gt3_search_label();
	gt3_search_cat_select();
	gt3_wpcf7_label();
	gt3_video_play_button();
	gt3_custom_color();
	gt3_draw_custom_quote();


	if (jQuery('.pp_block').length > 0) {
		html.addClass('pp_page');
	}
	if (jQuery('.gt3_js_bg_img').length > 0) {
		jQuery('.gt3_js_bg_img').each(function () {
			jQuery(this).css('background-image', 'url(' + jQuery(this).attr('data-src') + ')');
		});
	}
	if (jQuery('.gt3_js_bg_color').length > 0) {
		jQuery('.gt3_js_bg_color').each(function () {
			jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
		});
	}
	if (jQuery('.gt3_js_color').length > 0) {
		jQuery('.gt3_js_color').each(function () {
			jQuery(this).css('color', jQuery(this).attr('data-color'));
		});
	}
	if (jQuery('.gt3_js_transition').length > 0) {
		jQuery('.gt3_js_transition').each(function () {
			var transition_time = jQuery(this).attr('data-transition') + 'ms';
			jQuery(this).css({'transition-duration': transition_time});
		});
	}

	//Flickr Widget
	if (jQuery('.flickr_widget_wrapper').length > 0) {
		jQuery('.flickr_badge_image a').each(function () {
			jQuery(this).append('<div class="flickr_fadder"></div>');
		});
	}

	//Blank Anchors
	jQuery('a[href="#"]').on('click', function (e) {
		e.preventDefault();
	});

	gt3_flickr_widget(); // GT3 Flicker Widget
	gt3_includes_js();
	init_personal_preloader();

	if (jQuery('.swipebox').length > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		jQuery('.swipebox').swipebox();
	}

	if ($('body').hasClass('disable_right_click')) {
		$(document).on('contextmenu', function () {
			var msg = 'Right click disabled';
			if (typeof gt3_rcg === 'object') {
				msg = gt3_rcg.alert || 'Right click disabled';
			}
			alert(msg);
			return false;
		});
	}

	//Single Post
	if (jQuery('.single').length > 0 && jQuery('.format-standard-image').length > 0) {
		if (jQuery('.gt3-page-title_has_img_bg').length > 0) {
		} else {
			jQuery('body').addClass('visible_blog_post_media');
		}
	}

	//Map
	var gt3_map_class = jQuery('.elementor-widget-gt3-core-googlemap');
	if (gt3_map_class.length) {
		gt3_map_class.each(function () {
			jQuery(this).find('.section_map_height-yes').parents('.elementor-widget-gt3-core-googlemap').addClass('enable_section_map_height');
		});
	}

	var gt3_sharing = jQuery('.post_share_block');
	if (gt3_sharing.length) {
		gt3_sharing.on("mouseover", function () {
			jQuery(this).parents('.blog_post_preview').addClass("sharing-hover");
		});
		gt3_sharing.on("mouseleave", function () {
			jQuery(this).parents('.blog_post_preview').removeClass("sharing-hover");
		})
	}

	if (jQuery('rs-module').length) {
		jQuery('.wpda_builder_section').last().css({'border-bottom': 'none'});
	}

});

gt3_page_title_top_offset();

function gt3_draw_custom_quote(){
  var testimonials = jQuery('.elementor-testimonial-wrapper.elementor-testimonial-text-align-left,.elementor-testimonial-wrapper.elementor-testimonial-text-align-right');
  jQuery(testimonials).each(function(){
    var element = jQuery(this);
    if (element.length) {
      var quote_color = element.find('.elementor-testimonial-content').css('color');
      var canvas = document.createElement('canvas');
      element.prepend(canvas);

      var img = new Image;
      img.onload = function () {
        canvas.width = this.width;
        canvas.height = this.height;
        // draw image
        ctx.drawImage(this, 0, 0);
        // set composite mode
        ctx.globalCompositeOperation = "source-in";
        // draw color
        ctx.fillStyle = quote_color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }; img.src = gt3_gt3theme.templateUrl+"/img/quote.png";
      var ctx = canvas.getContext("2d");
    }
  })
}

function init_personal_preloader() {
	if (jQuery('.grid_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.grid_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.GridGallery(jQuery(value));
			}
		})
	}
	if (jQuery('.packery_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.packery_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.PackeryGallery(jQuery(value));
			}
		})
	}
	if (jQuery('.fs_gallery_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.fs_gallery_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.FullScreenSlider(jQuery(value));
			}
		})
	}
	if (jQuery('.shift_gallery_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.shift_gallery_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.ShiftGallery(jQuery(value));
			}
		})
	}
	if (jQuery('.masonry_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.masonry_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.MasonryGallery(jQuery(value));
			}
		})
	}
	if (jQuery('.gallery_kenburns.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.gallery_kenburns.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.KenburnsGallery(jQuery(value));
			}
		})
	}
	if (jQuery('.ribbon_slider_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.ribbon_slider_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.Ribbon(jQuery(value));
			}
		})
	}
	if (jQuery('.flow_slider_wrapper.not_elementor').not('.started').length) {
		jQuery.each(jQuery('.flow_slider_wrapper.not_elementor'), function (index, value) {
			if (typeof GT3ElementorGalleryFrontend !== 'undefined') {
				if (jQuery(value).hasClass('elementor')) return;
				GT3ElementorGalleryFrontend.Flow(jQuery(value));
			}
		})
	}
}

function gt3_includes_js() {
	// GT3 Button
	if (jQuery('.gt3_btn_customize').length) {
		jQuery('.gt3_btn_customize').each(function () {
			var this_btn = jQuery(this).find('a');
			var body_tag = jQuery('body');

			// Default Attributes
			var btn_default_bg = this_btn.attr('data-default-bg');
			var btn_default_color = this_btn.attr('data-default-color');
			var btn_default_border_color = this_btn.attr('data-default-border');
			var btn_default_icon = jQuery(this).find('.gt3_btn_icon').attr('data-default-icon');

			// Hover Attributes
			var btn_hover_bg = this_btn.attr('data-hover-bg');
			var btn_hover_color = this_btn.attr('data-hover-color');
			var btn_hover_border_color = this_btn.attr('data-hover-border');
			var btn_hover_icon = jQuery(this).find('.gt3_btn_icon').attr('data-hover-icon');

			// Theme Color
			var theme_color = body_tag.attr('data-theme-color');

			this_btn.mouseenter(function () {
				// Button Hover Bg
				if (typeof btn_hover_bg !== 'undefined') {
					this_btn.css({'background-color': btn_hover_bg});
				} else {
					this_btn.css({'background-color': '#ffffff'});
				}
				// Button Hover Text Color
				if (typeof btn_hover_color !== 'undefined') {
					this_btn.css({'color': btn_hover_color});
				} else {
					this_btn.css({'color': theme_color});
				}
				// Button Hover Border Color
				if (typeof btn_hover_border_color !== 'undefined') {
					this_btn.css({'border-color': btn_hover_border_color});
				} else {
					this_btn.css({'border-color': theme_color});
				}
				// Button Hover Icon Color
				if (typeof btn_hover_icon !== 'undefined') {
					this_btn.find('.gt3_btn_icon').css({'color': btn_hover_icon});
				} else {
					this_btn.find('.gt3_btn_icon').css({'color': '#ffffff'});
				}
			}).mouseleave(function () {
				// Button Default Bg
				if (typeof btn_default_bg !== 'undefined') {
					this_btn.css({'background-color': btn_default_bg});
				} else {
					this_btn.css({'background-color': theme_color});
				}
				// Button Default Text Color
				if (typeof btn_default_color !== 'undefined') {
					this_btn.css({'color': btn_default_color});
				} else {
					this_btn.css({'color': '#ffffff'});
				}
				// Button Default Border Color
				if (typeof btn_default_border_color !== 'undefined') {
					this_btn.css({'border-color': btn_default_border_color});
				} else {
					this_btn.css({'border-color': theme_color});
				}
				// Button Default Icon Color
				if (typeof btn_default_icon !== 'undefined') {
					this_btn.find('.gt3_btn_icon').css({'color': btn_default_icon});
				} else {
					this_btn.find('.gt3_btn_icon').css({'color': '#ffffff'});
				}
			});

		});
	}
}

function gt3_mega_menu() {
	jQuery('.gt3_header_builder > .gt3_header_builder__container .gt3_megamenu_active > .sub-menu, .gt3_header_builder > .sticky_header > .gt3_header_builder__container .gt3_megamenu_active > .sub-menu').each(function () {
		jQuery(this).find('.gt3_megamenu_triangle').css({
			'margin-left': '0px'
		});
		jQuery(this).css({
			'margin-left': '0px'
		});
		var elementWidth = jQuery(this).outerWidth();
		var windowWidth = jQuery(window).width();
		if (elementWidth > (windowWidth - 50) || jQuery(this).hasClass('huge_number_of_column')) {
			elementWidth = windowWidth - 50;
			jQuery(this).addClass('huge_number_of_column');
			var menu_item_width = jQuery(this).children('.menu-item').outerWidth();
			var namber_item_per_row = Math.floor(elementWidth / menu_item_width);
			var item_count = jQuery(this).children('.menu-item').length;
			var i = 1;
			var last_item_begin_from = (Math.floor(item_count / namber_item_per_row) * namber_item_per_row);
			jQuery(this).children('.menu-item').each(function () {
				i++;
				if (last_item_begin_from < i) {
					jQuery(this).css('max-width', (menu_item_width - 70) + 'px');
				}

			})
		} else {
			jQuery(this).removeClass('huge_number_of_column');
		}
		var halfWidth = Math.round(elementWidth / 2);

		var leftOffset = jQuery(this).offset().left - halfWidth;
		var rightOffset = windowWidth - (leftOffset + elementWidth);
		if (rightOffset < 25) {
			halfWidth = halfWidth + 25 - rightOffset;
		}
		if (leftOffset < 25) {
			halfWidth = halfWidth - 25 + leftOffset;
		}
		jQuery(this).find('.gt3_megamenu_triangle').css({
			'margin-left': (halfWidth - 34) + 'px'
		});
		jQuery(this).css({
			'margin-left': -halfWidth + 'px'
		})
	})
}

jQuery(window).resize(function () {
	if (jQuery(window).width() >= 1200) {
		gt3_mega_menu();
	}
	init_slick_post_gallery();
});

function gt3_back_to_top() {
	var W_height = jQuery(window).height();
	var element = jQuery('.gt3_back2top');
	if (element.length) {
		element.on('click', function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});
		var show_back_to_top = function () {
			if (jQuery(document).scrollTop() < W_height) {
				element.removeClass('show');
			}else{
				element.addClass('show');
			}
		};
		show_back_to_top();
		jQuery(window).scroll(function () {
			show_back_to_top();
		});
	}
}

function gt3_page_title_top_offset(){
	var gt3_header_builder = jQuery('.gt3_header_builder.header_over_bg'),
		wpda_header_builder = jQuery('.header_over_bg.wpda-builder'),
		wpda_header_builder_tablet = jQuery('.header_over_bg_tablet.wpda-builder'),
		wpda_header_builder_mobile = jQuery('.header_over_bg_mobile.wpda-builder'),
		window_width = jQuery(window).width();

	if (window_width > 768 && gt3_header_builder.length) {
		jQuery('.gt3-page-title').css('padding-top',gt3_header_builder.height()+'px');
	}

	if (wpda_header_builder.length || wpda_header_builder_tablet.length || wpda_header_builder_mobile.length) {
		var wpda_header_builder_over_bg = jQuery('div');
		if (window_width > 1024 && wpda_header_builder.length) {
			wpda_header_builder_over_bg = wpda_header_builder;
		} else if ((window_width >= 768 && window_width <= 1024) && wpda_header_builder_tablet.length) {
			wpda_header_builder_over_bg = wpda_header_builder_tablet;
		} else if (window_width < 768 && wpda_header_builder_mobile.length) {
			wpda_header_builder_over_bg = wpda_header_builder_mobile;
		}
		if (wpda_header_builder_over_bg.parent().next().hasClass('gt3-page-title_wrapper')) {
			jQuery('.gt3-page-title').css('padding-top',wpda_header_builder_over_bg.height()+'px');
		}
	}

}

// Custom Colors
function gt3_custom_color(){
	jQuery('.gt3_custom_color').each(function(){
		var element = jQuery(this);
		var color = element.attr('data-color')
		var hover_color = element.attr('data-hover-color')
		var bg_color = element.attr('data-bg-color')
		var border_color = element.attr('data-border-color')
		var bg_hover_color = element.attr('data-hover-bg-color')
		var border_hover_color = element.attr('data-hover-border-color')

		//set default colors
		if(typeof color !== 'undefined') {
			element.css({'color' : color});
		} else {
			element.css({'color' : ''});
		}
		if (typeof bg_color !== 'undefined') {
			element.css({'background-color' : bg_color});
		}else {
			element.css({'background-color' : ''});
		}

		if (typeof border_color !== 'undefined') {
			element.css({'border-color' : border_color});
		}else {
			element.css({'border-color' : ''});
		}

		//change colors on mouseenter / mouseleave
		element.mouseenter(function(){
			// Button Hover Text Color
			if(typeof hover_color !== 'undefined') {
				element.css({'color' : hover_color});
			}
			if (typeof bg_hover_color !== 'undefined') {
				element.css({'background-color' : bg_hover_color});
			}
			if (typeof border_hover_color !== 'undefined') {
				element.css({'border-color' : border_hover_color});
			}
		}).mouseleave(function(){
			// Button Default Text Color
			if(typeof color !== 'undefined') {
				element.css({'color' : color});
			} else {
				element.css({'color' : ''});
			}
			if (typeof bg_color !== 'undefined') {
				element.css({'background-color' : bg_color});
			}else {
				element.css({'background-color' : ''});
			}
			if (typeof border_color !== 'undefined') {
				element.css({'border-color' : border_color});
			}else {
				element.css({'border-color' : ''});
			}
		});
	})
}

// mobile menu
function gt3_mobile_menu() {
	var windowW = jQuery(window);
	var loaded = false;
	var main_menu = jQuery('.mobile_menu_container .main-menu > ul');
	var sub_menu = jQuery('.mobile_menu_container .main-menu > ul ul');
	var mobile_toggle = jQuery('.mobile-navigation-toggle');

	if (windowW.width() <= 1200) {
		sub_menu.hide().removeClass('showsub');
		main_menu.hide().addClass('mobile_view_on');
		loaded = true;
		gt3_mobile_menu_switcher(main_menu)
	} else {
		sub_menu.show();
		main_menu.show();
	}

	jQuery(window).resize(function () {
		if (windowW.width() <= 1200) {
			if (!mobile_toggle.hasClass('is-active')) {
				sub_menu.hide().removeClass('showsub');
				main_menu.hide().removeClass('showsub').addClass('mobile_view_on');
				mobile_toggle.removeClass('is-active')
			}
			if (loaded === false) {
				loaded = true;
				gt3_mobile_menu_switcher(main_menu)
			}
		} else {
			sub_menu.show().removeClass('showsub');
			main_menu.show().removeClass('showsub').removeClass('mobile_view_on');
			mobile_toggle.removeClass('is-active')
		}
	});
}

// end mobile menu

function gt3_mobile_menu_switcher(main_menu) {
	if (jQuery(main_menu).find('.menu-item-has-children > .mobile_switcher').length == 0) {
		jQuery(main_menu).find('.menu-item-has-children').append('<div class="mobile_switcher"></div>')
	}
	var toggle = jQuery('.mobile-navigation-toggle');
	var timeStamp = 1;
	toggle.on("tap click", function (event) {
		if ((event.timeStamp - timeStamp) > 300 ) {
			timeStamp = event.timeStamp;
			if (toggle.hasClass('is-active')) {
				main_menu.removeClass('showsub').slideUp(200);
				toggle.removeClass('is-active')
			} else {
				main_menu.addClass('showsub').slideDown(200);
				toggle.addClass('is-active')
			}
		}
	});

	jQuery(main_menu).find('.menu-item-has-children > .mobile_switcher , .menu-item-has-children > a[href*="#"]').on("tap click", function (event) {
		event.preventDefault();
		var element = jQuery(this);
		if (timeStamp != event.timeStamp) {
			timeStamp = event.timeStamp;
			if (element.hasClass('is-active')) {
				element.prev('ul.sub-menu').removeClass('showsub').slideUp(200);
				element.next('ul.sub-menu').removeClass('showsub').slideUp(200);
				element.removeClass('is-active')
			} else {
				element.prev('ul.sub-menu').addClass('showsub').slideDown(200);
				element.next('ul.sub-menu').addClass('showsub').slideDown(200);
				element.addClass('is-active')
			}
		}
	});
}

function gt3_burger_sidebar() {
	var element = jQuery('.gt3_header_builder_burger_sidebar_component');
	var sidebar = jQuery('.gt3_header_builder__burger_sidebar');
	jQuery('.gt3_header_builder_burger_sidebar_component,.gt3_header_builder__burger_sidebar-cover').on('click', function () {
		if (element.hasClass('active')) {
			element.removeClass('active');
			sidebar.removeClass('active');
			jQuery('body').removeClass('active_burger_sidebar');

		} else {
			element.addClass('active');
			sidebar.addClass('active');
			jQuery('body').addClass('active_burger_sidebar');
		}
	});
	jQuery(sidebar).on('swiperight', function () {
		if (element.hasClass('active')) {
			element.removeClass('active');
			sidebar.removeClass('active');
			jQuery('body').removeClass('active_burger_sidebar');

		} else {
			element.addClass('active');
			sidebar.addClass('active');
			jQuery('body').addClass('active_burger_sidebar');
		}
	})
}

function gt3_modal_login() {
	var element = jQuery('.gt3_header_builder__login-modal');
	jQuery('.gt3_header_builder_login_component,.gt3_header_builder__login-modal-close,.gt3_header_builder__login-modal-cover').on('click', function () {
		if (element.hasClass('active')) {
			element.removeClass('active');
		} else {
			element.addClass('active');
		}
	})
}

function gt3_search() {
	var top_search = jQuery('.header_search');

	if (top_search.length > 0) {
		top_search.each(function () {

			var $ctsearch = jQuery(this),
				$ctsearchinput = $ctsearch.find('input.search_text'),
				$body = jQuery('html, body'),
				openSearch = function () {
					$body.addClass('ct-search-open');
					$ctsearch.data('open', true).addClass('ct-search-open');
					$ctsearchinput.focus();
					return false;
				},
				closeSearch = function () {
					$body.removeClass('ct-search-open');
					$ctsearch.data('open', false).removeClass('ct-search-open');
				};

			$ctsearchinput.on('click', function (e) {
				e.stopPropagation();
				$ctsearch.data('open', true);
			});

			$ctsearch.find('.header_search__icon').on('click', function (e) {
				e.stopPropagation();
				if (!$ctsearch.data('open')) {
					console.log('opened')
					openSearch();
				}
				else {
					if ($ctsearchinput.val() === '') {
						closeSearch();
						return false;
					}
				}
			});

			$ctsearch.find('.header_search__inner_cover').on('click', function (e) {
				closeSearch();
			});
			$ctsearch.find('.header_search__inner_close').on('click', function (e) {
				closeSearch();
			});

			top_search.on('click', function () {
				var element = jQuery(this);
				if (element.hasClass('ct-search-hover')) {
					element.removeClass('ct-search-hover');
				} else {
					element.addClass('ct-search-hover');
					setTimeout(function () {
						element.find('input.search_text').focus();
					}, 100);
				}
			})

		});
	}

	jQuery(".search_form .search_submit").on("mouseover", function () {
		jQuery(this).parents('.search_form').addClass("button-hover");
	});
	jQuery(".search_form .search_submit").on("mouseleave", function () {
		jQuery(this).parents('.search_form').removeClass("button-hover");
	})
}

function gt3_message_close() {
	jQuery(".gt3_message_box-closable").each(function () {
		var element = jQuery(this);
		element.find('.gt3_message_box__close').on('click', function () {
			element.slideUp(300);
		})
	})
}

jQuery(window).on('load', function () {
	jQuery('.gt3_circle-overlay').addClass('gt3_circle-load_done'); // GT3_Preloader
	jQuery('.gt3_linear-loading').fadeOut();
	jQuery('.gt3_theme_prl-loading').fadeOut();
});

// GT3 Flicker Widget
function gt3_flickr_widget() {
	if (jQuery('.flickr_widget_wrapper').length) {
		jQuery('.flickr_widget_wrapper').each(function () {
			var flickrid = jQuery(this).attr('data-flickrid');
			var widget_id = jQuery(this).attr('data-widget_id');
			var widget_number = jQuery(this).attr('data-widget_number');
			jQuery(this).addClass('flickr_widget_wrapper_' + flickrid);

			jQuery.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=" + widget_id + "&lang=en-us&format=json&jsoncallback=?", function (data) {
				jQuery.each(data.items, function (i, item) {
					if (i < widget_number) {
						jQuery("<img/>").attr("src", item.media.m).appendTo(".flickr_widget_wrapper_" + flickrid).wrap("<div class=\'flickr_badge_image\'><a href=\'" + item.link + "\' target=\'_blank\' title=\'Flickr\'></a></div>");
					}
				});
			});
		});
	}
}

// Post Likes
jQuery(document).on("click", ".post_likes_add", function (event) {
	var post_likes_this = jQuery(this);
	if (!jQuery.cookie(post_likes_this.attr('data-modify') + post_likes_this.attr('data-postid'))) {
		jQuery.post(gt3_gt3theme.ajaxurl, {
			action: 'add_like_attachment',
			attach_id: jQuery(this).attr('data-postid'),
			_ajax_nonce: gt3_gt3theme._ajax_nonce,
		}, function (response) {
			jQuery.cookie(post_likes_this.attr('data-modify') + post_likes_this.attr('data-postid'), 'true', {expires: 7, path: '/'});
			post_likes_this.addClass('already_liked');
			post_likes_this.find('span.like_count').text(response);
		});
	}
});

function gt3_search_label() {
	if (jQuery('.gt3_search_form, .gt3_form, #mc_signup .mc_merge_var').length) {
		jQuery('.gt3_search_form, .gt3_form, #mc_signup .mc_merge_var').each(function () {
			var _elem = jQuery(this).find('input, textarea');
			if (_elem.val() !== "") {
				_elem.prev('label').addClass('gt3_onfocus');
			}
			_elem.on('focus', function () {
				jQuery(this).prev('label').addClass('gt3_onfocus');
			}).on('blur', function () {
				if (jQuery(this).val() === "") {
					jQuery(this).prev('label').removeClass('gt3_onfocus');
				}
			});
		})
	}
}

function gt3_search_cat_select() {
	jQuery('select#gt3_product_cat, select#product_cat, .wpcf7-form-control-wrap select').select2();
}

function gt3_wpcf7_label() {
	if (jQuery('.wpcf7-form .label').length) {
		jQuery('.wpcf7-form .label').each(function () {
			var _this_label = jQuery(this);
			_this_label.parent().find('input, textarea').on('focus', function () {
				_this_label.addClass('gt3_onfocus');
			}).on('blur change', function (e) {
				var _this = jQuery(this);
				if (e.type === 'blur') {
					setTimeout(function () {
						if (_this.val() === "") {
							_this_label.removeClass('gt3_onfocus');
						} else {
							_this_label.addClass('gt3_onfocus');
						}
					}, 200);
				} else {
					if (_this.val() === "") {
						_this_label.removeClass('gt3_onfocus');
					} else {
						_this_label.addClass('gt3_onfocus');
					}
				}
			});

		});
	}
}

// Post Gallery
function init_slick_post_gallery() {
	var all_wrappers = jQuery('.blog_post_media .slider-wrapper');
	if (!all_wrappers.length) {
		return;
	}

	jQuery.each(all_wrappers, function (key, $scope) {
		var slick_wrapper = jQuery('.slick_wrapper', $scope);
		if (slick_wrapper.hasClass('slick-initialized')) {
			slick_wrapper.slick('unslick');
		}
		slick_wrapper.slick({
			autoplay: true,
			arrows: true,
			dots: true,
			slidesToScroll: 1,
			slidesToShow: 1,
			focusOnSelect: true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			dotsClass: 'gt3_custom_slick_paging',
			customPaging: function (slider, i) {
				return  (i + 1) + '<span>/</span>' + slider.slideCount;
			}
		});
	})
}

// Video
function gt3_video_play_button() {
	jQuery('.blog_post_media.has_post_thumb').each(function () {
		var iframe = jQuery(this).find('.gt3_video__play_iframe iframe');
		var iframe_wrapper = jQuery(this).find('.gt3_video__play_iframe');
		var thumb = jQuery(this).find('.gt3_video_wrapper__thumb');
		var video_autoplay;
		jQuery(this).find('.gt3_video__play_button').on('click', function () {
			video_autoplay = jQuery(this).attr('data-video-autoplay');
			iframe[0].src += video_autoplay;
			iframe_wrapper.addClass('play_video');
			thumb.addClass('play_video');
		})

	})
}

jQuery(window).resize(function () {
	if (jQuery(window).width() >= 1200) {
		gt3_mega_menu();
	}
	init_slick_post_gallery();
});
