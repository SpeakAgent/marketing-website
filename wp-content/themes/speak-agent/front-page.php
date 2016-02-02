<?php

//* Remove Default Title markup
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

//* Remove Default Content markup
remove_action( 'genesis_loop', 'genesis_do_loop' );

//* Remove Footer from home page

/** Remove footer widgets */
remove_theme_support( 'genesis-footer-widgets', 3 );



//* Print out homepage



//* Define Left Column
function print_left_col(){
	echo '<div class="col-left one-half first">';
	print_logo();
	print_learner_cta();
	echo '</div>';
}

//* Define Right Column
function print_right_col(){
	echo '<div class="col-right one-half">';
	print_form_invite_req_fp();
	echo '</div>';
}



//* Print Logo

function print_logo(){
	echo '<div class="brand-promo"><h1 class="brand-header"><a href="http://speakagent.github.io"><img src="/wp-content/themes/speak-agent/images/home-logo.png" alt="Speak Agent with sample icons" /></a></h1>';
	echo '<h2 class="brand-tagline">Play with <em>your</em> words!<sup class="registered-mark">sm</sup></h2></div>';
}

//* Print Call to Action for Learners

function print_learner_cta(){
	echo '<div class="cta-learner"><p>Have a student account?</p>
		<div><a class="btn btn-lg" href="http://speakagent.github.io">Play Now! <i class="fa fa-caret-right"></i></a></div></div>';
}

//* Print Invite Request Form on Front Page

function print_form_invite_req_fp(){
	echo '<div class="form-container" id="fp-form-invite">';
	print_form_invite_req();
	echo '<div class="cta-accept-invite"><a href="" class="call-popup-accept-invite">
		<span class="fa-stack fa-lg fa-invite">
  			<i class="fa fa-heart fa-stack-2x"></i>
  			<i class="fa fa-arrow-right fa-stack-1x"></i>
		</span> <strong>Have a code? Accept your invite!</strong></div></div></div>';
}

//* Print Learn More Link

function print_sub_footer() {
	echo '<div class="sub-footer"><p><a href="/about">Learn more about Speak Agent <i class="fa fa-caret-right"></i></a></p></div>';
}


add_action('genesis_before_footer','print_sub_footer');
add_action( 'genesis_before_loop', 'print_left_col' );
add_action('genesis_before_loop', 'print_right_col');

//* Run the Genesis loop
genesis();