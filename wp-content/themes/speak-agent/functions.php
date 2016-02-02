<?php
//* Start the engine
include_once( get_template_directory() . '/lib/init.php' );

//* Set Localization (do not remove)
load_child_theme_textdomain( 'speakagent', apply_filters( 'child_theme_textdomain', get_stylesheet_directory() . '/languages', 'speakagent' ) );

/* Child theme (do not remove) Orignial theme: Minimum by Studiopress. Adapted for Speak Agent by Rocketkoi */
define( 'CHILD_THEME_NAME', __( 'Speak Agent', 'speakagent' ) );
define( 'CHILD_THEME_URL', 'http://www.speakagent.com' );
define( 'CHILD_THEME_VERSION', '2.0.0' );

//* Add HTML5 markup structure
add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list' ) );

//* Add viewport meta tag for mobile browsers
add_theme_support( 'genesis-responsive-viewport' );

//* Enqueue scripts
add_action( 'wp_enqueue_scripts', 'sa_enqueue_scripts' );
function sa_enqueue_scripts() {

	wp_enqueue_script( 'sa-responsive-menu', get_bloginfo( 'stylesheet_directory' ) . '/js/responsive-menu.js', array( 'jquery' ), '1.0.0' );
	wp_enqueue_script( 'sa-magnific-popup', get_bloginfo( 'stylesheet_directory' ) . '/js/magnific-popup.min.js', array( 'jquery' ), '1.0.0' );
	wp_enqueue_script( 'sa-fitvids', get_bloginfo( 'stylesheet_directory' ) . '/js/jquery.fitvids.js', array( 'jquery' ), '1.0.0' );
	wp_enqueue_script( 'sa-theme-js', get_bloginfo( 'stylesheet_directory' ) . '/js/speakagent-theme.js', array( 'jquery' ), '1.0.0' );
	wp_enqueue_style( 'dashicons' );
	wp_enqueue_style( 'sa-google-fonts', '//fonts.googleapis.com/css?family=Noto+Sans:400,400italic,700,700italic|Source+Sans+Pro:900,900italic', array(), CHILD_THEME_VERSION );

}


//* Add support for structural wraps
add_theme_support( 'genesis-structural-wraps', array(
	'header',
	'site-tagline',
	'nav',
	'subnav',
	'home-featured',
	'site-inner',
	'footer-widgets',
	'footer'
) );

//* Add support for 3-column footer widgets
add_theme_support( 'genesis-footer-widgets', 3 );

//* Unregister layout settings
genesis_unregister_layout( 'content-sidebar-sidebar' );
genesis_unregister_layout( 'sidebar-content-sidebar' );
genesis_unregister_layout( 'sidebar-sidebar-content' );

//* Unregister secondary sidebar
unregister_sidebar( 'sidebar-alt' );


//* Remove site description
remove_action( 'genesis_site_description', 'genesis_seo_site_description' );

//* Reposition the primary navigation menu
remove_action( 'genesis_after_header', 'genesis_do_nav' );
add_action( 'genesis_header', 'genesis_do_nav' );

//* Reposition the secondary navigation menu
remove_action( 'genesis_after_header', 'genesis_do_subnav' );

add_action( 'genesis_footer', 'genesis_do_subnav', 0);

//* Reduce the secondary navigation menu to one level depth
add_filter( 'wp_nav_menu_args', 'sa_secondary_menu_args' );
function sa_secondary_menu_args( $args ){

	if( 'secondary' != $args['theme_location'] )
	return $args;

	$args['depth'] = 1;
	return $args;

}


//* Hook after post widget after the entry content
add_action( 'genesis_after_entry', 'sa_after_entry', 5 );
function sa_after_entry() {

	if ( is_singular( 'post' ) )
		genesis_widget_area( 'after-entry', array(
			'before' => '<div class="after-entry widget-area">',
			'after'  => '</div>',
		) );

}


//* Remove comment form allowed tags
add_filter( 'comment_form_defaults', 'sa_remove_comment_form_allowed_tags' );
function sa_remove_comment_form_allowed_tags( $defaults ) {

	$defaults['comment_notes_after'] = '';
	return $defaults;

}

//* Register widget areas

genesis_register_sidebar( array(
	'id'          => 'after-entry',
	'name'        => __( 'After Entry', 'speakagent' ),
	'description' => __( 'This is the after entry widget area.', 'speakagent' ),
) );


//* Print Sign In Popup

function print_sign_in_popup(){
	echo '<div class="popup popup-default mfp-with-anim mfp-hide" id="si-form-container">
	<div class="popup-header">
		<h2>Welcome!</h2>
		<p>It\'s nice to see you!</p>
	</div>
	<div class="popup-body">
	<form id="si-form">
		<div class="form-group">
			<label for="si-email">Enter your email. <small class="label-required">required</small></label>
			<input required type="email" id="si-email" name="si-email">
		</div>
		<div class="form-group">
			<label for="si-password">Enter your password. <small class="label-required">required</small></label>
			<input required type="password" id="si-email" name="si-password">
			<p class="form-forgot-password"><a href="#fp-form-container" class="call-popup-forgot-password">Forgot your password?</a></p>
		</div>
		<div class="form-group">
			<label for="si-remember"><input type="checkbox" name="si-remember" id="si-remember" value=""> Remember me.</label>
		</div>
		<div class="form-group">
			<button class="is-full-width"><i class="fa fa-fixed fa-sign-in"></i> Sign In</button>
		</div>
	</form></div>
	<div class="popup-footer">
		<p class="popup-cta-secondary"><i class="fa fa-fixed fa-paper-plane"></i> No account? <a href="#" class="call-popup-request-invite">Request an invite.</a></p>
	</div>
	</div>';
}

//* Print Invite Request Form


function print_form_invite_req(){
	echo '<form class="form-request-invite">
			<div class="form-header cta-invite">
				<h2>Join Now!</h2>
				<p>Apply for the Speak Agent Beta so you can use great audiovisual activities! <a href="/about">Learn more.</a></p>
			</div>
			<fieldset>
				<div class="form-group">
				<label for="i-email">Enter your email. <small class="label-required">required</small></label>
				<input required type="email" id="i-email" name="i-email">
				</div>
				<div class="form-group">
				<label for="i-reason">Tell us why you\'d like an invitation. <small class="label-required">required</small></label>
				<textarea required id="i-reason" name="i-reason"></textarea>
				</div>
				<div class="form-group">
					<button class="is-full-width btn-lg"><i class="fa fa-paper-plane fa-fixed"></i> Request an Invitation</button>
				</div>
			</fieldset>
		</form>
		<div class="form-err form-request-invite-err">
			<div class="form-header">
				<h2>Sorry!</h2>
				<p>It looks like there was a problem. Please try again later or <a href="/contact-us">contact us directly<a/>.</p>
			</div>
			<div class="form-body">
				<p><img src="'.get_bloginfo( 'stylesheet_directory' ).'/images/symbols/sorry.png" alt="Boy saying he is sorry." /></p>
			</div>
		</div>
		<div class="form-confirmation form-request-invite-conf">
			<div class="form-header">
				<h2>Request sent!</h2>
				<p>Keep an eye on your email (and spam filters) to see if you made it in!</p>
			</div>
			<div class="form-body">
				<p><img src="'.get_bloginfo( 'stylesheet_directory' ).'/images/symbols/thank_you.png" alt="Boy saying thank you!" /></p>
			</div>
		</div>';
}

//* Print Request Invite Popup

function print_request_invite_popup(){
	echo '<div class="popup popup-default mfp-with-anim mfp-hide" id="ri-form-container">
	<div class="popup-body">';
	print_form_invite_req();
	echo '</div><div class="popup-footer">
		<p class="popup-cta-secondary"><span class="fa-stack fa-invite fa-fixed">
  			<i class="fa fa-heart fa-stack-2x"></i>
  			<i class="fa fa-arrow-right fa-stack-1x"></i>
		</span>&nbsp; Have a code? <a href="#" class="call-popup-accept-invite">Accept your invite!</a></p></div></div>';
}

//* Print Forgot Password Popup

function print_forgot_password_popup(){
	echo '<div class="popup popup-default mfp-with-anim mfp-hide" id="fp-form-container">
	<div class="popup-header"><h2>Forgot your password?</h2></div>
	<div class="popup-body">
		<form>
			<div class="form-group">
			<label for="i-email">Enter your email. <small class="label-required">required</small></label>
			<input required type="email" id="i-email" name="i-email">
			</div>
			<div class="form-group">
				<button class="is-full-width">Submit Request</button>
			</div>
		</form>
	</div>
	</div>';
}

//* Print Accept Invite Poup

function print_accept_invite_popup(){
	echo '<div class="popup popup-default mfp-with-anim mfp-hide" id="ai-form-container">
	<div class="popup-body">
		<form id="form-redeem-invite">
			<div class="form-header"><h2>Come on in!</h2>
			<p>Use your invite code to get engaging activities for your students!</p></div>
			<div class="form-group">
			<label for="r-email">Enter your email. <small class="label-required">required</small></label>
			<input required type="email" id="r-email" name="r-email">
			</div>
			<div class="form-group">
			<label for="r-code">Enter your invite code. <small class="label-required">required</small></label>
			<input required type="text" id="r-code" name="r-code">
			</div>
			<div class="form-group">
			<label for="r-password">Create a password. <small class="label-required">required</small></label>
			<input required type="password" id="r-password" name="r-password">
			</div>
			<div class="form-group">
				<button class="is-full-width"><i class="fa fa-plus fa-fixed"></i>&nbsp;Create Account</button>
			</div>
		</form>
		<div class="form-err form-accept-invite-err">
			<div class="form-header">
				<h2>Sorry!</h2>
				<p>It looks like there was a problem. Please try again later or <a href="/contact-us">contact us directly<a/>.</p>
			</div>
			<div class="form-body">
				<p><img src="'.get_bloginfo( 'stylesheet_directory' ).'/images/symbols/sorry.png" alt="Boy saying he is sorry." /></p>
			</div>
		</div>
		<div class="form-confirmation form-accept-invite-conf">
			<div class="form-header">
				<h2>You\'re all set!</h2>
				<p>Welcome to Speak Agent! Click the button below to <a href="http://speakagent.github.io">sign in</a>.</p>
			</div>
			<div class="form-body">
				<p><img src="'.get_bloginfo( 'stylesheet_directory' ).'/images/symbols/thank_you.png" alt="Boy saying thank you!" /></p>
				<p><a href="http://speakagent.github.io" class="btn btn-tertiary btn-sm btn-cta"><i class="fa fa-fixed fa-sign-in"></i> Sign In</a></p>
			</div>
		</div>
	</div>
	<div class="popup-footer">
		<p class="popup-cta-secondary"><i class="fa fa-fixed fa-sign-in"></i> Already have an account? <a href="http://speakagent.github.io">Sign In!</a></p>
	</div>
	</div>';
}


add_action('genesis_after','print_sign_in_popup');
add_action('genesis_after','print_request_invite_popup');
add_action('genesis_after','print_forgot_password_popup');
add_action('genesis_after','print_accept_invite_popup');