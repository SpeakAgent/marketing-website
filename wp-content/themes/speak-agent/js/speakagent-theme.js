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

        $("form.form-request-invite").submit(function(event){

            // This prevents a redirect because it was driving
            // me nuts. Feel free to remove. -KC

            event.preventDefault();

            // Sending the actual invite

            var $inputs = $('form.form-request-invite :input');

            $.post( "https://lexemes-dev.herokuapp.com/invite/request/", {
                email: $( "input#i-email").val()
                },
                function( data ) {
                    $( ".result" ).html( data );
                }
            ).fail(function(){
                $('.form-request-invite-err').show();
            }).done(function(data){
                $('.form-request-invite-conf').show();
            }).always(function(){
                $('.form-request-invite').hide();
            });

            // Creating a survey result

            var vals = {
                email: $( "input#i-email").val(),
                reason: $( "textarea#i-reason").val()
            }

            console.log(vals)

            $.post( "https://lexemes-dev.herokuapp.com/survey/response/add/",
                {   title: 'Registration',
                    values: JSON.stringify(vals, null, 2)})
        });

        // Target your .container, .wrapper, .post, etc.
        $(".entry-content").fitVids();

    });



})( this, jQuery );
