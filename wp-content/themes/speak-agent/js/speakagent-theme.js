( function( window, $, undefined ) {

    'use strict';

    $(document).ready(function() {

        // Popups

        // Sign In
        $('.call-popup-sign-in').magnificPopup({
            removalDelay: 500,
            items: {
                src: '#si-form-container',
                type: 'inline'
            },
            mainClass: 'mfp-zoom-in'
        });

        // Request Invite in Header
        $('.call-popup-request-invite').magnificPopup({
            removalDelay: 500,
            items: {
                src: '#ri-form-container',
                type: 'inline'
            },
            mainClass: 'mfp-zoom-in'
        });

        // Forgot Password
        $('.call-popup-forgot-password').magnificPopup({
            removalDelay: 500,
            items: {
                src: '#fp-form-container',
                type: 'inline'
            },
            mainClass: 'mfp-zoom-in'
        });

        // Accept Invite
        $('.call-popup-accept-invite').magnificPopup({
            removalDelay: 500,
            items: {
                src: '#ai-form-container',
                type: 'inline'
            },
            mainClass: 'mfp-zoom-in'


        });

        $("form#request-invite").submit(function(event){
            event.preventDefault();
            var $inputs = $('form#request-invite :input');
            $.post( "http://127.0.0.1:8000/invite/request/",
                {email: $( "input#i-email").val()}, 
                function( data ) {
                    $( ".result" ).html( data );
            });
        });

        // Target your .container, .wrapper, .post, etc.
        $(".entry-content").fitVids();

    });



})( this, jQuery );
