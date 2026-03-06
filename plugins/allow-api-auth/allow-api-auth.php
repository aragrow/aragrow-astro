<?php
/**
 * Plugin Name: Allow API Auth
 * Description: Allows WP REST API requests that carry an Authorization header
 *              (Application Passwords) to bypass the REST API block mu-plugin.
 *              Runs at priority 1 — before the "Shake Before Using" block (priority 10).
 *              Upload to wp-content/mu-plugins/ on the server (NOT wp-content/plugins/).
 * Version:     1.0.0
 * Author:      AraGrow LLC
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_filter( 'rest_authentication_errors', function ( $error ) {
    // Hostinger / Apache may expose the header under any of these keys
    $has_auth = ! empty( $_SERVER['HTTP_AUTHORIZATION'] )
             || ! empty( $_SERVER['PHP_AUTH_USER'] )
             || ! empty( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] );

    if ( $has_auth ) {
        // Remove the REST-blocking filter so WP's own Application Password
        // auth can process the header and log the user in before responding.
        remove_filter( 'rest_authentication_errors', 'disable_rest_api_by_user', 10 );
    }

    return $error;
}, 1 ); // priority 1 runs before the block at priority 10
