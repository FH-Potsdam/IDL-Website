<?php
/**
 * Functions File
 *
 * @copyright  Copyright © 2013 Jordi Tost
 * @license    http://www.opensource.org/licenses/gpl-2.0.php GNU GPL version 2
 * @version    2.0
 *
 * @Developer Jordi Tost (Follow Me: @jorditost)
 *
 * Notes: PHP vars are lowercase.
 *        Vars that are passed to jQuery are camelcase.
 */

update_option( 'siteurl', 'http://idl.fh-potsdam.de' );
update_option( 'home', 'http://idl.fh-potsdam.de' );

//////////////////
// Custom Utils
//////////////////

require_once('inc/utils/Mobile_Detect.php');
require_once('inc/wp-utils/wp-utils.php');
require_once('inc/wp-utils/wp-language-utils.php');
require_once('inc/wp-utils/wp-gallery-utils.php');
require_once('inc/wp-utils/wp-admin-utils.php');
require_once('inc/wp-utils/wp-client-utils.php');
require_once('inc/custom-post-types.php');


/////////////////////
// Inits & Globals
/////////////////////

// Load jQuery in Footer
global $load_jquery_in_footer;
$load_jquery_in_footer = true;

// Test vars
global $test;
$test = true;


//////////////////////
// Mobile Detection
//////////////////////

global $detect;
global $isMobile;
global $isIpad;
global $isTablet;
global $isIE;

$detect   = new Mobile_Detect();
$isMobile = ( $detect->isMobile() ) ? true : false;
$isIpad   = ( $detect->isIpad() )   ? true : false;
$isTablet = ( $detect->isTablet() ) ? true : false;
$isIE     = ( $detect->isIE() )     ? true : false;

function mobile_class() {

    global $isMobile;
    global $isIpad;
    global $isTablet;

    if ($isMobile) {
        echo " mobile";
    }

    if ($isIpad || $isTablet) {
        echo " tablet";
    }
}

/*
 * Force URLs in srcset attributes into HTTPS scheme.
 * This is particularly useful when you're running a Flexible SSL frontend like Cloudflare
 */
function ssl_srcset( $sources ) {
  foreach ( $sources as &$source ) {
    $source['url'] = set_url_scheme( $source['url'], 'https' );
  }

  return $sources;
}
add_filter( 'wp_calculate_image_srcset', 'ssl_srcset' );

////////////////////////
// Language Functions
////////////////////////

global $sitetrings;
$siteStrings = array(
        // Usage: 'text_id' => __('[:en]Text in English[:de]Text auf Deutsch')
    );

function get_site_text($text_id) {
    global $siteStrings;
    return $siteStrings[$text_id];
}

function get_language_code() {
    if (function_exists('qtrans_getLanguage')) {
        return qtrans_getLanguage();
    }
    return '';
}

// Get a custom field for the current language
function get_post_custom_field_lang($custom_field) {
    $lang = get_language_code();
    $lang_ext = (!empty($lang)) ? '_' . $lang : '';

    return get_post_custom_field($custom_field . $lang_ext);
}


////////////////////////
// Section Functions
////////////////////////

add_action('wp_head', 'check_section');

function get_current_section() {
    global $current_section;
    return $current_section;
}

function get_current_section_class() {
    global $current_section;
    return (isset($current_section) && !empty($current_section)) ? 'section-' . $current_section : '';
}


///////////////////////
// Template Redirect
///////////////////////

/*function custom_template_redirect() {

    global $post;
    global $current_section;

    if (is_404() && !is_admin()) {
        wp_redirect( home_url(), 301 );
        exit;
    }

    // When in content pages, redirect to the first child of the post type
    if (is_page(array('feste-dritte-zaehne'))) {

        global $post;

        // Get first child page
        $args = array(
                'posts_per_page'  => 1,
                'orderby'         => 'menu_order',
                'order'           => 'ASC',
                'post_parent'     => $post->ID,
                'post_type'       => 'page' // page slug is custom post type slug
            );

        // Get posts
        $child_page = get_posts( $args );

        if ($child_page && sizeof($child_page) >= 1) {
            wp_redirect(get_permalink($child_page[0]->ID));
            exit;
        }

    // Case Studies -> Load first child
    } elseif (is_page('case-studies')) {

        $args = array(
                'posts_per_page'  => 1,
                'orderby'         => 'menu_order',
                'order'           => 'ASC',
                'post_type'       => 'case' // page slug is custom post type slug
            );

        // Get posts
        $case = get_posts( $args );

        if ($case && sizeof($case) >= 1) {
            wp_redirect(get_permalink($case[0]->ID));
            exit;
        }
    }
}
add_action('template_redirect', 'custom_template_redirect');*/

////////////////
// Navigation
////////////////

function custom_nav_menu($menu_name, $show_home = false, $hide_active = false) {

    // Value retrieved with action 'check_section'
    global $current_section;

    if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {

        $menu       = wp_get_nav_menu_object( $locations[ $menu_name ] );
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list  = '<ul id="menu-' . $menu_name . '" class="menu">';

        // Home link
        if ($show_home && !(is_home() || is_front_page())) {
            $menu_list .= '<li id="menu-item-home"><a href="' . get_option('home') . '/">' . __('Home') . '</a></li>';
        }

        // Display menu
        foreach ((array) $menu_items as $key => $menu_item) {

            // Parent pages only
            if ($menu_item->menu_item_parent != 0)
                continue;

            $object_id = $menu_item->object_id;
            $title     = $menu_item->title;
            $url       = $menu_item->url;
            $page_slug = $menu_item->post_name;

            $object_id = $menu_item->object_id;
            $title     = $menu_item->title;
            $url       = function_exists('qtrans_getLanguage') ? qtrans_convertURL($menu_item->url) : $menu_item->url;
            $page_slug = ($menu_item->object == 'page') ? get_page_slug_by_ID($object_id) : $menu_item->post_name;

            $is_active = (isset($current_section)) ? ($page_slug == $current_section) : (is_page($menu_item->object_id) || $page_slug == get_post_type());

            if (get_post_type() == 'project') {
                $is_active = ($page_slug == 'projects');
            }

            // Hide active if necessary
            if ($is_active && $hide_active) {
                continue;
            }

            $class = $is_active ? ' class="active"' : '';

            $menu_list .= '<li id="menu-item-' . $page_slug . '"'. $class .'><a href="' . $url . '">' . $title . '</a></li>';
        }
        $menu_list .= '</ul>';

        echo $menu_list;
    }
}

///////////////////////
// Content Functions
///////////////////////

// Post Subtitle
function has_subtitle() {
    global $post;
    $subtitle = get_the_subtitle();
    return !empty($subtitle);
}

function get_the_subtitle() {
    global $post;
    $subtitle = get_field('subtitle');
    return $subtitle;
}

function the_subtitle($apply_filters = true) {
    echo nls2br(get_the_subtitle());
}

function the_row_list($field) {

    // loop through the rows of data
    while ( have_rows($field) ) : the_row();

        $name = get_sub_field('name');
        $url = get_sub_field('url');

        $echo = (empty($url)) ? $name : '<a href="' . $url . '" target="_blank" title="' . $name . '">' . $name . '</a>';
?>
    <li><?php echo $echo; ?></li>
<?php
    endwhile;
}

function the_row_logos_list($field) {

    // loop through the rows of data
    while ( have_rows($field) ) : the_row();

        $name = get_sub_field('name');
        $url = get_sub_field('url');
        $logo = get_sub_field('logo');
        $logo_url = "";
        if(!empty($logo)){
        	if(is_array($logo)){
        		$logo_url = $logo["sizes"]["sidebar-image"];
        	}else{
        		$logo_url = $logo;
        	}
		}

        if(empty($url) && empty($logo_url)){
        	$echo = $name;
        }elseif(empty($url)){
        	$echo = '<img src="' . $logo_url . '" alt="'.$name.'" />';
        }else{
        	$echo = '<a href="' . $url . '" target="_blank" title="' . $name . '"><img src="' . $logo_url . '" alt="'.$name.'" /></a>';
        }

?>
    <li><?php echo $echo; ?></li>
<?php
    endwhile;
}

function in_custom_category($category, $post_id) {

  return (count(wp_get_object_terms($post_id, $category)) > 0);
}

function the_team_list() {

    $posts = get_field('project_team');

    if ( $posts ): foreach( $posts as $p ): // variable must NOT be called $post (IMPORTANT)
?>
    <?php if (!is_object_in_term($p->ID, 'people-category', array('past-students', 'past-members'))) : ?>
    <li><a href="<?php echo get_permalink( $p->ID ); ?>"><?php echo get_the_title( $p->ID ); ?></a></li>
    <?php else: ?>
    <li><?php echo get_the_title( $p->ID ); ?></li>
    <?php endif; ?>
<?php endforeach; endif;
}


// function get_project_tags() {
//     return get_the_terms_string('project-tag', '  · ');
// }


//////////////////
// Sort Filters
//////////////////

function the_sort_filters($taxonomy, $filter_type = 'single', $exclude = array(), $show_all = true) {

    $ret = '';

    $args = array(
        'orderby'       => 'id',
        'order'         => 'ASC',
        'hide_empty'    => true,
        'exclude'       => $exclude
    );
    $terms = get_terms($taxonomy, $args);

    if (!is_wp_error($terms) && count($terms) > 0) {

        // All
        if ($show_all) {

            $all_text = (get_language_code() == 'de') ? 'Alle' : 'All';

            $ret .= '<li class="all active"><a href="#" data-filter="*" data-type="' . $filter_type . '">'.$all_text.'</a></li>';
        }

        foreach ( $terms as $term ) {
            $ret .= '<li><a href="#" data-filter=".' . $term->slug . '" data-type="' . $filter_type . '">' . $term->name . '</a></li>';
        }
    }

    echo $ret;
}

function the_home_filter() {
?>
    <ul>
        <li class="all active"><a href="#" data-filter="*" data-type="single">All</a></li>
        <li><a href="#" data-filter=".project" data-type="single">Projects</a></li>
        <li><a href="#" data-filter=".publication" data-type="single">Publications</a></li>
        <?php the_sort_filters('category', 'single', array(1), false); ?>
    </ul>
<?php
}

function the_projects_filter() {
?>
    <ul>
    <?php the_sort_filters('category', 'single', array(1,36)); ?>
    </ul>
<?php
}


/////////////////////
// Content Filters
/////////////////////

function add_link_image_class ($content) {

    global $post;
    $pattern = "/<a(.*?)href=('|\")(.*?).(bmp|gif|jpeg|jpg|png)('|\")(.*?)>/i";
    $replacement = '<a$1class="img" href=$2$3.$4$5$6>';
    //$replacement = '<a$1class="img" href=$2$3.$4$5$6</a>';
    $content = preg_replace($pattern, $replacement, $content);
    $content = str_replace("%LIGHTID%", $post->ID, $content);
    return $content;
}
add_filter('the_content', 'add_link_image_class');


/////////////////
// Theme Setup
/////////////////

add_action( 'after_setup_theme', 'my_theme_setup' );

if ( ! function_exists( 'my_theme_setup' ) ):

function my_theme_setup() {

    // Tiny MCE styles
    add_editor_style();

    // This theme uses post thumbnails
    add_theme_support( 'post-thumbnails' );

    // Register extra featured images
    // http://wordpress.org/plugins/multiple-post-thumbnails/
    // https://github.com/voceconnect/multi-post-thumbnails
    if (class_exists('MultiPostThumbnails')) {

        $types = array('post', 'page', 'custom_pt');
        foreach($types as $type) {
            new MultiPostThumbnails(array(
                'label' => 'Secondary Image',
                'id' => 'secondary-image',
                'post_type' => $type
                )
            );
        }

        // Array with all registered IDs for compatibility with wp-gallery-utils.php
        global $exclude_thumb_ids;
        $exclude_thumb_ids = array(
                'post'      => array('secondary-image'),
                'custom_pt' => array('secondary-image-cpt')
            );

        // Language images
        // Translate post images for pages, eBook Services and Software Details
        if (function_exists('qtrans_getLanguage')) {

            global $q_config;

            $types = array('page', 'ebook-service', 'software');

            // Languages
            $langs =  qtrans_getSortedLanguages(); //array('en', 'es');
            foreach($langs as $lang) {

                // Use default thumbnail for default language (Deutsch)
                if ($lang == $q_config['default_language']) continue;

                // Post types
                foreach($types as $type) {
                    new MultiPostThumbnails(
                        array(
                            'label' => 'Beitragsbild (' . strtoupper($lang) . ')',
                            'id' => 'thumbnail-'.$lang,
                            'post_type' => $type
                        )
                    );

                    // Add exclude

                    // If key exists, add thumbnail id
                    if ($exclude_thumb_ids[$type]) {
                        array_push($exclude_thumb_ids[$type], 'thumbnail-'.$lang);

                    // If not defined, create array key
                    } else {
                        $exclude_thumb_ids[$type] = array('thumbnail-'.$lang);
                    }
                }
            }
        }
    }

    // Images size
    if (function_exists( 'add_image_size' )) {
        //set_post_thumbnail_size( 380, 9999 );             // 380px wide (and unlimited height) - default Post Thumbnail dimensions
        add_image_size( 'sidebar-image', 150);
        add_image_size( 'grid-thumb', 380, 285, true);
        add_image_size( 'member-image', 425, 350, true);
        add_image_size( 'content-image', 660, 9999, false);
        //add_image_size( 'content-image', 425, 350, true);
        //add_image_size( 'cover-image', 1180, 600 );


        // Add image sizes to media library

        add_filter('image_size_names_choose', 'my_image_sizes');
        function my_image_sizes($sizes) {
          $addsizes = array(
            "content-image" => __( "Content Image")
          );
          $newsizes = array_merge($sizes, $addsizes);
          return $newsizes;
        }
    }

    // Add support for menus
    register_nav_menu('main-menu', 'Main menu');
    register_nav_menu('footer-menu', 'Footer menu');

    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );
}
endif;

// Excerpt box for Pages
if ( function_exists('add_post_type_support') ) {
    add_action('init', 'add_page_excerpts');
    function add_page_excerpts() {
        add_post_type_support( 'page', 'excerpt' );
    }
}


//////////////////
// Init Scripts
//////////////////

function my_scripts_method() {

    // Register jQuery
    // =================
    // by using the wp_enqueue_scripts hook (instead of the init hook which many articles reference),
    // we avoid registering the alternate jQuery on admin pages, which will cause post editing (amongst other things)
    // to break after upgrades often.

    global $load_jquery_in_footer;

    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', ( "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" ), false, false, $load_jquery_in_footer);

    global $detect;
    global $test;
    global $isMobile;
    global $isIpad;
    global $isTablet;
    global $isIE;
    global $siteStrings;

    if ( $isMobile ) {

    } else {

    }

    $deps = array('jquery', 'isotope');
    wp_enqueue_script('isotope', get_template_directory_uri().'/js/jquery.isotope.min.js', array('jquery'), null, true);

    // Site functions
    if ( $test ) {
        wp_enqueue_script('theme_functions', get_template_directory_uri().'/js/functions.js', $deps, null, true);
    } else {
        wp_enqueue_script('theme_functions', get_template_directory_uri().'/js/functions.min.js', $deps, null, true);
    }

    // Localize script to use 'siteVars' in functions.js file
    wp_localize_script(
        'theme_functions',
        'siteVars',
        array(
            'siteurl'     => get_option('siteurl'),
            'ajaxurl'     => (function_exists('qtrans_getLanguage')) ?
                                admin_url('admin-ajax.php?lang=' . qtrans_getLanguage()) :
                                admin_url( 'admin-ajax.php' ),
            'lang'        => get_language_code(),
            'siteStrings' => json_encode($siteStrings),
            'isMobile'    => $isMobile,
            'isIpad'      => $isIpad,
            'isTablet'    => $isTablet,
            'isIE'        => $isIE
        )
    );

    // Remove "Comment Reply" scripts
    wp_dequeue_script('comment-reply');
}
add_action( 'wp_enqueue_scripts', 'my_scripts_method', 20 );


///////////////////
// Admin Scripts
///////////////////

function my_admin_scripts_method() {

    //wp_register_script('jquery-ui-core');
    wp_enqueue_script('jquery-ui-datepicker', get_template_directory_uri().'/js/ui.datepicker.js', array('jquery','jquery-ui-core'));

    wp_enqueue_script('admin-js-functions',get_template_directory_uri().'/js/admin.js', array('jquery','jquery-ui-core','jquery-ui-datepicker'));

    // Path to jQuery UI theme stylesheet
    wp_enqueue_style('jquery-ui','http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css');

    wp_print_styles();
}
//add_action('admin_print_scripts', 'my_admin_scripts_method');


/////////////////////////////////
// HTML5 Reset initializations
/////////////////////////////////

// Clean up the <head>
function remove_head_links() {
    // remove_action('wp_head', 'rsd_link');
    // remove_action('wp_head', 'wlwmanifest_link');
    remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
    remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
    //remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
    //remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
    remove_action( 'wp_head', 'index_rel_link' ); // index link
    remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
    remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
    remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post.
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
    remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version
}
add_action('init', 'remove_head_links');
//remove_action('wp_head', 'wp_generator');
?>
