/*! Copyright 2018, BGS (https://www.buildgrowscalelive.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.1.1
*
* Plugin: BGSWheelSpinner
* Author: BGS Team
*/


(function($) {
	$.fn.BGSWheelSpinner = function(el,options) {
		var bgs = this;
		// Default settings of BGSWheelSpinner
		var settings = $.extend({
		    bgs_hit_button       : $(".bgs-btn-submit"),
		    bgs_apply_button	: $(".apply-bgs-disc"), // For apply button

		    /* General settings */
	  		bgs_wheel_text : ['FREE '+"<br>"+' SHIPPING','5% OFF','FREE '+"<br>"+' BRACELET','10% OFF'],
	  		bgs_spinner_couponcode 	 : ['Get1%','Get2%','Get3%','Get4%'],
	  		bgs_spinner_probability  : [0.1,0.2, 0.3, 0.0],
	  		bgs_spinner_numbers 	 : ['1', '2','3','4'],
	  		bgs_spinner_title : 'Enter your email and <em>GET instance Discount</em>. Lucky you!',
	  		bgs_spinner_lucky_winnercode : '',
	  		bgs_spinner_timer_to_load:1000,
	  		bgs_spinner_layout_type:'slider', //slider or popup
	  		
	  		/* Cookie settings */
	  		bgs_set_cookie : 'no',
	  		bgs_cookie_name : 'bgs_coockie',
	  		bgs_cookie_val : '1',
	  		bgs_cookie_store_day : '14',

	  		
	  		/* Customize Spinner */
	  		bgs_middle_smaller_text:"Spin to unlock your",
	  		bgs_middle_bigger_text:"I'm Felling lucky",
	  		bgs_middle_btn_text : "Click Here",
	  		bgs_middle_link_text:"I don't want to save money.",
	  		bgs_btn_submit : "Make me lucky NOW!",
	  		bgs_email_placeholder_text : "Enter your email",
	  		bgs_email_error : "Please, Enter Valid Email",
	  		bgs_theme_color : "#283A56",
	  		bgs_wheel_background_image_allowed : "Yes",
	  		bgs_backgroud_img_url : 'img/bg-swirl-dark.png',
	  		bgs_pointer_img_url : 'img/pointer.png',
	  		bgs_main_wheel_img_url : 'img/main-bg.png',
	  		bgs_inner_wheel_img_url : 'img/inner-bg.png',


	  		/* Spinner animation */
	  		bgs_animation_duration:'3s',
	  		bgs_animation_iteration_count:'1',
	  		bgs_webkit_animation_duration:'6.5s',
	  		bgs_webkit_animation_iteration_count:'1'

		}, options);

		// initallize plugin
		bgs.init = function(){
			if(settings.bgs_spinner_layout_type == "popup"){
				$(".bgs-wheel").addClass("popup");
			}
			if(settings.bgs_spinner_layout_type == "slider"){
				$(".bgs-wheel").addClass("slider");
			}

		    $(".bgs-title").html(settings.bgs_spinner_title);
		    // Loop for wheel text
		    for (var i = 0; i < settings.bgs_wheel_text.length; i++) {
		    	var data_slice_val = i + 1;
		    	$("div[data-slice='"+data_slice_val+"']").html(settings.bgs_wheel_text[i]);
		    }

		    
		    $(".bgs-btn-fire").text(settings.bgs_middle_btn_text);
		    $(".bgs-btn-submit").text(settings.bgs_btn_submit);
		    if(settings.bgs_wheel_background_image_allowed == "Yes"){
		    	$('.bgs-wheel').find('.bgs-bg').css('background-image', 'url("' + settings.bgs_backgroud_img_url + '")');
			}
			$(".pointer-image").attr("src",settings.bgs_pointer_img_url);
			$('.popup-wheel-wrapper').css('background-image', 'url(' + settings.bgs_main_wheel_img_url + ')');
			$('.inner-text').css('background-image', 'url(' + settings.bgs_inner_wheel_img_url + ')');
		    $('.bgs-left-inner').find('.smaller_text').text(settings.bgs_middle_smaller_text);
		    $('.bgs-left-inner').find('.bigger_text').text(settings.bgs_middle_bigger_text);
		    $('.bgs-left-inner').find('.link_text').text(settings.bgs_middle_link_text);
		    $(".bgs-email").attr("placeholder",settings.bgs_email_placeholder_text);
		    //(settings.bgs_set_cookie == "yes") ? checkCookie() : DeleteCookie(settings.bgs_cookie_name);
		    setTimeout(function(){ 
		    	$(document).find('.bgs-wheel').addClass("bgs-visible");
		    	$(".bgs-theme").css("background",settings.bgs_theme_color);
		    }, settings.bgs_spinner_timer_to_load);

		    $(".bgs-spinning").css("-webkit-animation-duration",settings.bgs_webkit_animation_duration);
		    $(".bgs-spinning").css("-webkit-animation-iteration-count",settings.bgs_webkit_animation_iteration_count);
		    $(".bgs-spinning").css("animation-duration",settings.bgs_animation_duration);
		    $(".bgs-spinning").css("animation-iteration-count",settings.bgs_animation_iteration_count);


		
		};

		// Start spinner
		bgs.start = function(){
	 		var filterd_list = generatedLuckByChanceList(settings.bgs_spinner_numbers, settings.bgs_spinner_probability);
	 		var random_num = rand(0, filterd_list.length-1);
	 		settings.bgs_spinner_lucky_winnercode = parseInt(filterd_list[random_num])-1;
	 		$(".inner-text-box").html("<div class='bgs-discount-code' style='display:none;'>" + settings.bgs_spinner_couponcode[settings.bgs_spinner_lucky_winnercode] + "</div><button style='display:none;' class='bgs-discount-btn apply-bgs-disc'>Apply Discount</button><button style='display:none;' class='bgs-cancel-btn'>Cancel</button>");
		    $(this).addClass("spin"+filterd_list[random_num]);

		}


		// Define click event of email box
		settings.bgs_hit_button.click(function(){
			 if( bgs.validateEmail($(".bgs-email").val())) {
				bgs.start();
			   	$(document).find('.bgs-spinner-popup').removeClass("bgs-spinner-popup-open");	
			 } else {
			 	$(".bgs-email").addClass("bgs-email-error");
			 	$(".bgs-error").text(settings.bgs_email_error);
			 	$(".bgs-error").css("display","block");
			 }		
		});

		$(document).on('click','.apply-bgs-disc',function(){
			console.log("sdfsdf");
			$(this).addClass("animate");
			// Continue code for cookie or to apply actual discount 
		});



	   	// Detect event of start
	    $(this).one('webkitAnimationStart oanimationstart msAnimationStart animationstart',  function(event) {
	      		$(".bgs-error").css("display","none");
	   	});

		// Detect event of end
	   $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',  function(event) {
	   		//$(".inner-text").attr("style","display: flex;justify-content: center;align-items: center;color: #ca70a4;font-size:30px;");
	   		$(".inner-text-box").find("div,button").fadeIn("slow");
	   		$(".bgs-email").remove();
	   		 
	   		// setTimeout(function(){ $('.inner-text').addClass('animated hinge slower'); }, 2000);
		});

	    /* ------ Handler functions for cookies starts ------- */
	    //Set cookie which delete after 14 days
	    function setCookie(cookieName,cookieValue) {
	        var today = new Date();
	        var expire = new Date();
	        // settings.bgs_cookie_store_day
	        // expire.setTime(today.getTime() + 3600000*24*14);
	        expire.setTime(today.getTime() + 3600000*24*parseInt(settings.bgs_cookie_store_day));
	        document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString()+"; path=/;";
	    }

	   	// Check Cookie if exits or not
	   	function checkCookie() {
	   	    var user = getCookie(settings.bgs_cookie_name);
	   	    if (user != "") {
	   	        console.log("Welcome again " + user);
	   	    } else {
	   	        setCookie(settings.bgs_cookie_name,settings.bgs_cookie_val);
	   	    }
	   	}

	   	//Get Cookie value
	   	function getCookie(cookieName) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + cookieName + "=");
			var return_statement = (parts.length == 2) ? parts.pop().split(";").shift() : "";
			return return_statement;
		}

		//Delete Cookie
	   	function DeleteCookie(cookieName, cookieValue) {
	   	    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	   	}
	   	/* ------ Handler functions for cookies ends ------- */

	   	var rand = function(min, max) {
	   	    return Math.floor(Math.random() * (max - min + 1)) + min;
	   	};

	   	var generatedLuckByChanceList = function(bgs_spinner_numbers, bgs_spinner_probability) {
	   	    var filterd_list = [];
	   	    // Loop over bgs_spinner_probability
	   	    for (var i = 0; i < bgs_spinner_probability.length; i++) {
	   	        var multiples = bgs_spinner_probability[i] * 100;
	   	        
	   	        // Loop over the list of items
	   	        for (var j = 0; j < multiples; j++) {
	   	            filterd_list.push(bgs_spinner_numbers[i]);
	   	        }
	   	    }
	   	    return filterd_list;
	   	};

	   	// Validate plugin
	   	bgs.validateEmail = function($email){
	   	   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	   	     return regex.test($email);
	   	};

		// Intialize spinner.
		bgs.init();

	}
}(jQuery));

function createspinner(){
	var html;
	html = "";
	html += '<div class="bgs-wheels">';
	html += '<div class="bgs-wheel bgs-theme">';
		html += '<div class="bgs-bg"></div>';
		html += '<div class="bgs-close">';
			html += '<svg width="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M77.6 21.1l-28 28.1-28.1-28.1-1.9 1.9 28 28.1-28 28.1 1.9 1.9L49.6 53l28 28.1 2-1.9-28.1-28.1L79.6 23"/></svg>';
		html += '</div>';
		html += '<div class="bgs-wrapper">';
			html += '<div class="bgs-inner-wrapper">';
				html += '<div class="bgs-left-inner">';
					
					html += '<div class="bgs-shadows"></div>';
					html += '<div class="inner-text">';
		              	html += '<div class="inner-text-box">';
			            html += '<p class="wheel-instructions__heading wheel-instructions__heading--mini smaller_text"></p>';
			                html += '<p class="wheel-instructions__heading wheel-instructions__heading--small bigger_text"></p>';
			                html += '<button class="btn basic-btn small full inner-text-btn bgs-btn-fire" data-popup-spin=""></button>';
			                html += '<p class="link popup-wheel__alternative-action" data-modal-hide="popup-wheel-modal">';
			                html += '<a href="javascript:;" title="" class="bgs-not-lucky link_text"></a>';
			                html += '</p>';
		              	html += '</div>';
		              	html += '<div class="bgs-pointer">';
							html += '<img class="pointer-image" src="" alt="">';
						html += '</div>';
					html += '</div>';
					html += '<div class="shadow-small"></div>';
					html += '<div class="bgs-wheel-container bgs-spinning bgsspinner" id="bgsspinner">';
						html += '<div class="popup-wheel-wrapper">';
						  html += '<div class="wheel-promo-step" data-wheel-promo-step="1" data-wheel-promo-step-active="">';
						    html += '<div class="bgs-slice popup-wheel__option popup-wheel__option--1" data-slice="1" ></div>';
						    html += '<div class="bgs-slice popup-wheel__option popup-wheel__option--2" data-slice="2" ></div>';
						    html += '<div class="bgs-slice popup-wheel__option popup-wheel__option--3" data-slice="3" ></div>';
						    html += '<div class="bgs-slice popup-wheel__option popup-wheel__option--4" data-slice="4" ></div>';
						  html += '</div>';
						html += '</div>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
		html += '</div>';
		// BGS Popup
		html += '<div class="bgs-spinner-popup">';
			html += '<div class="bgs-popup-inner">';
				html += '<div class="bgs-bg"></div>';
				html += '<a href="javascript:;" class="bgs-close-popup">';
					html += '<svg width="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M77.6 21.1l-28 28.1-28.1-28.1-1.9 1.9 28 28.1-28 28.1 1.9 1.9L49.6 53l28 28.1 2-1.9-28.1-28.1L79.6 23"/></svg>';
				html += '</a>';
				html += '<div class="bgs-form-wrapper">';
					html +='<div class="bgs-error" style="display: none"></div>';
					html +='<input type="email" data-bgs-required="email" class="bgs-email" name="bgs-email"  />';
					html +='<div class="bgs-form-fields"></div>';
					html +='<button	class="bgs-btn-submit bgs-color-2" type="submit"></button>';
					html +='<div class="bgs-response"></div>';
				html += '</div>';
			html += '</div>';
		html += '</div>';
		// BGS Popup Inner
	html += '</div>';
	html += '</div>';
	
	document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', html);
}



createspinner();

setTimeout(function(){ $('.bgsspinner').BGSWheelSpinner(); }, 1000);

$(".bgs-close").on("click", function(){
 	$(document).find('.bgs-wheel').removeClass("bgs-visible");
});

$(document).on('click','.bgs-cancel-btn',function(){
 	$(document).find('.bgs-wheel').removeClass("bgs-visible");
});
$(".bgs-not-lucky").on("click", function(){
 	$(document).find('.bgs-wheel').removeClass("bgs-visible");
});
$(".bgs-btn-fire").on("click", function(){
 	$(document).find('.bgs-spinner-popup').addClass("bgs-spinner-popup-open");
});
$(".bgs-close-popup").on("click", function(){
 	$(document).find('.bgs-spinner-popup').removeClass("bgs-spinner-popup-open");
});