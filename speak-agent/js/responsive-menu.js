( function( window, $, undefined ) {

    'use strict';

    $(document).ready(function() {
        // run test on initial page load
        checkSize();

        // run test on resize of the window
        $(window).resize(checkSize);

		$("header .genesis-nav-menu, .nav-primary .genesis-nav-menu").addClass("responsive-menu");


		$(".responsive-menu > .menu-item").click(function(event){
			if (event.target !== this)
			return;
				$(this).find(".sub-menu:first").slideToggle(function() {
				$(this).parent().toggleClass("menu-open");
			});
		});

	 	// Add toggles to sub menus
		$( 'nav .sub-menu' ).before( '<button class="sub-menu-toggle btn-toggle" role="button" aria-pressed="false"></button>' );


		// Show/hide primary navigation
		$("#responsive-menu-toggle").click(function(){
			$(this).toggleClass('activated');
			$("header .responsive-menu").slideToggle('fast');

		});

		// Show/hide the child navigation
		$( '.sub-menu-toggle' ).on( 'click', function() {
			var $this = $( this );
			$this.attr( 'aria-pressed', function( index, value ) {
				return 'false' === value ? 'true' : 'false';
			});

			$this.toggleClass( 'activated' );
			$this.next( '.sub-menu' ).slideToggle( 'fast' );

		});

    });

	$(window).resize(function(){

		if('window.innerWidth' > 800) {

		}

	});

//Function to the css rule
    function checkSize(){
        if ($("#responsive-menu-toggle").css("display") == "none" ){
            $("header .genesis-nav-menu, .nav-primary .genesis-nav-menu, nav .sub-menu").removeAttr("style");
			$(".responsive-menu > .menu-item").removeClass("menu-open");
			$("#responsive-menu-toggle").removeClass("activated");
        }
    }


})( this, jQuery );
