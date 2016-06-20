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

            // Sending the actual code and info

            var $inputs = $('form.form-redeem-invite :input');

            console.log($inputs);

            $.post( "https://lexemes-prod.herokuapp.com/invite/redeem/", {
                email: $( "input#r-email").val(),
                code: $( "input#r-code" ).val(),
                password: $( "input#r-password" ).val()
                },
                function( data ) {
                    $( ".r-result" ).html( data );
                }
            ).fail(function(err){
                if(err.status == '404') {
                    $('.form-err-txt').html('<strong>We can\'t find that invite code.</strong> Please try again later or <a href="/contact-us">contact us directly<a/>.');
                    $('.form-redeem-invite-err').show();
                } else {
                    $('.form-err-txt').html('It looks like there was a problem. Please try again later or <a href="/contact-us">contact us directly<a/>.');
                    $('.form-redeem-invite-err').show();
                }
            }).done(function(data){
                $('.form-redeem-invite-conf').show();
            }).always(function(){
                $('#form-redeem-invite').hide();
            });
        });


        $("form.form-request-invite").submit(function(event){

            // This prevents a redirect because it was driving
            // me nuts. Feel free to remove. -KC

            event.preventDefault();

            // Sending the actual invite

            var $inputs = $('form.form-request-invite :input');

            $.post( "https://lexemes-prod.herokuapp.com/invite/request/", {
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

            $.post( "https://lexemes-prod.herokuapp.com/survey/response/add/",
                {   title: 'Registration',
                    values: JSON.stringify(vals, null, 2)})
        });

        // Show/Hide Password in Redeem Invite form from http://jsfiddle.net/herdiansc/dnznh/8/

        $.toggleShowPassword = function (options) {
            var settings = $.extend({
                field: "#r-password",
                control: "#r-show-password",
            }, options);

            var control = $(settings.control);
            var field = $(settings.field)

            control.bind('click', function () {
                if (control.is(':checked')) {
                    field.attr('type', 'text');
                } else {
                    field.attr('type', 'password');
                }
            })
        };

        $.toggleShowPassword({
            field: '#r-password',
            control: '#r-show-password',
        });


        // Add Visual Character Count to Email input form
        // From http://www.scriptiny.com/2012/09/jquery-input-textarea-limiter/
        $.fn.extend({
            limit_characters: function(max, counter){
                $(this).bind("keydown focus", function(){
                    var self = this;
                    window.setTimeout(function(){
                        var chars = self.value.length;
                        if(chars > max) {
                            self.value = self.value.substr(0, max);
                            chars = max;
                        }
                        if ((max-chars == 0) && (typeof(counter) != 'undefined')) {
                            $('#i-chars-remaining').addClass('at-limit');
                            if ($('#i-msg-email #i-msg-alert').length == 0){
                                $('#i-msg-email').append(' <small class="i-msg" id="i-msg-alert"><strong>Email longer than 30 characters?</strong> <a href="/contact-us">Contact us to make an account for you</a>.</small>');
                            }
                            counter.html(max-chars);
                        }
                        else {
                            if($('#i-chars-remaining').hasClass('at-limit')){
                                $('#i-chars-remaining').removeClass('at-limit');
                                $('#i-msg-email #i-msg-alert').remove();
                            }
                            counter.html(max-chars);
                        }
                    }, 5);
                });
            }
        });

        // Target Counter for Email Input
        var elem01 = $(".form-request-invite #i-chars-remaining");
        $(".form-request-invite #i-email").limit_characters(30, elem01);

        var elem02 = $("#form-redeem-invite #i-chars-remaining");
        $("#form-redeem-invite #r-email").limit_characters(30, elem02);

        // Target your .container, .wrapper, .post, etc. so that Videos become responsive
        $(".entry-content").fitVids();


    });



})( this, jQuery );
