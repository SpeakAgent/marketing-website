<?php
/**
 * This file adds the Archive template to the Speak Agent Theme.
 *
 * @author StudioPress
 * @package Speak Agent
 * @subpackage Customizations
 */

/*
Template Name: Page for Posts
*/

add_action( 'genesis_before_loop', 'rgc_blog_intro' );
function rgc_blog_intro() {
  $posts_page = get_option( 'page_for_posts' );
  if ( is_null( $posts_page ) ) {
    return;
  }
  $title   = get_post( $posts_page )->post_title;
  $content = get_post( $posts_page )->post_content;
  $title_output = $content_output = '';
  if ( $title ) {
    $title_output = sprintf( '<h1 class="entry-title">%s</h1>', $title );
  }
  if ( $content ) {
    $content_output = wpautop( $content );
  }
  if ( $title || $content ) {
    printf( '<header class="entry-header">%s</header>', $title_output . $content_output );
  }
}

//* Run the Genesis loop
genesis();
