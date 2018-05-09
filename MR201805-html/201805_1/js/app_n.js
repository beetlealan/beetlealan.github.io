$(document).ready(function(){

	$("#toggle").on("click", function(){
		 $(".line").toggleClass("on");
	    $(".menu").toggleClass('active');
	    $(".back_b").toggleClass("on");
	});


	  $(function () {
	  $(window).scroll(function () {
	    var scrollVal = $(this).scrollTop();
	   
	    if(scrollVal > 80){
	    	$('.top').addClass('on');
	    	
	    }
	    else{
	    	$('.top').removeClass('on');
	    }
	  });

		  $(window).scroll(function(){
		    var scrollint = $(window).scrollTop();
		    if ($(window).height() + $(window).scrollTop() == $(document).height()) {

		       $( '.top' ).css( 'margin-bottom','70px' );
		       if($(window).width()<=640){
	              $( '.top' ).css( 'margin-bottom','30px' );
	            }
		      
		    }
		    else{
		    	$( '.top' ).css( 'margin-bottom','40px' );
		    }
		});
	})

   if($(window).width()>960){ 
		    $('.top').click(function(){
			    $('html,body').animate({scrollTop:$('#top_banner').offset().top}, 800);
			});
			
		}

	if($(window).width()<=960){ 
		    $('.top').click(function(){
			    $('html,body').animate({scrollTop:$('#top_banner').offset().top-50}, 800);
			});
		}
	
	

});
