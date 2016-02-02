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

        // Redeem Invite

        $('.call-popup-accept-invite').magnificPopup({
            removalDelay: 500,
            items: {
                src: '#ai-form-container',
                type: 'inline'
            },
            mainClass: 'mfp-zoom-in'
        });


        /* Checks URL on page load to see if it is someone redeeming the invite */
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        $(window).load(function(){

            var varCheck = window.location.search;

            if (varCheck){

                // Gets Invite Code
                var redeemVar = getParameterByName('redeem');

                // Gets Invitee Email Addy
                var inviteeVar = getParameterByName('invitee');

                if(redeemVar){
                    $("input#r-code").val(redeemVar);
                    $.magnificPopup.open({
                        removalDelay: 500,
                        items: {
                            src: '#ai-form-container',
                            type: 'inline'
                        },
                        mainClass: 'mfp-zoom-in'
                    });

                }

                if (inviteeVar) {
                    $("input#r-email").val(inviteeVar);
                }
            }

        });


        $("form#form-redeem-invite").submit(function(event){

            // This prevents a redirect because it was driving
            // me nuts. Feel free to remove. -KC

            event.preventDefault();

            // Sending the actual invite

            var $inputs = $('form.form-redeem-invite :input');
            console.log($inputs)

            $.post( "https://lexemes-dev.herokuapp.com/invite/redeem/", {
                email: $( "input#r-email").val(),
                code: $( "input#r-code" ).val(),
                password: $( "input#r-password" ).val()
                },
                function( data ) {
                    $( ".r-result" ).html( data );
                    console.log( {email: $( "input#r-email").val(),
                code: $( "input#r-code" ).val(),
                password: $( "input#r-password" ).val()})
                }
            ).fail(function(){
                $('.form-redeem-invite-err').show();
            }).done(function(data){
                $('.form-redeem-invite-conf').show();
            }).always(function(){
                $('.form-redeem-invite').hide();
            });
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

        // Target your .container, .wrapper, .post, etc. so that Videos become responsive
        $(".entry-content").fitVids();

    });



})( this, jQuery );
