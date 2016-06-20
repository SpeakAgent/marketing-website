<?php
/**
 * This file adds the Archive template to the Speak Agent Theme.
 *
 * @author StudioPress
 * @package Speak Agent
 * @subpackage Customizations
 */

/*
Template Name: Archive
*/
add_action('genesis_before_content','add_archive_title');

//* Run the Genesis loop
genesis();
