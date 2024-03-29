 <!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie ie6 ie-lt10 ie-lt9 ie-lt8 ie-lt7 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 ie-lt10 ie-lt9 ie-lt8 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 ie-lt10 ie-lt9 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 ie-lt10 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js<?php mobile_class(); ?>" <?php language_attributes(); ?>><!--<![endif]-->
<!-- the "no-js" class is for Modernizr. -->

<head>

	<meta charset="<?php bloginfo('charset'); ?>">

	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
	<!--[if IE ]>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<![endif]-->

	<?php if (is_search()) echo '<meta name="robots" content="noindex, nofollow" />'; ?>

    <title><?php
              if (is_home() || is_front_page()) {
                 bloginfo('name'); echo ' | '; bloginfo('description'); }
              else {
                  bloginfo('name'); echo ' | '; }

              if (function_exists('is_tag') && is_tag()) {
                 single_tag_title("Tag Archive for &quot;"); echo '&quot;'; }
              elseif (is_archive()) {
                 wp_title(''); echo ' Archive'; }
              elseif (is_search()) {
                 echo 'Search for &quot;'.wp_specialchars($s).'&quot;'; }
              elseif (!(is_404()) && (is_single()) || (is_page())) {
                 wp_title(''); }
              elseif (is_404()) {
                 echo 'Not Found'; }

              if ($paged>1) {
                 echo ' - page '. $paged; }
           ?></title>

    <meta name="title" content="<?php
              if (is_home() || is_front_page()) {
                 bloginfo('name'); echo ' | '; echo bloginfo('description'); }
              else {
                  bloginfo('name'); echo ' | '; }

              if (function_exists('is_tag') && is_tag()) {
                 single_tag_title("Tag Archive for &quot;"); echo '&quot;'; }
              elseif (is_archive()) {
                 wp_title(''); echo ' Archive'; }
              elseif (is_search()) {
                 echo 'Search for &quot;'.wp_specialchars($s).'&quot;'; }
              elseif (!(is_404()) && (is_single()) || (is_page())) {
                 wp_title(''); }
              elseif (is_404()) {
                 echo 'Not Found'; }

              if ($paged>1) {
                 echo ' - page '. $paged; }
           ?>">

    <meta name="description" content="<?php echo strip_tags(__(get_page_content_by_path('home', false))); ?>" />
    <meta name="keywords" content="Interaction Design, Interface Design, InfoVis, Geo-Visualization, Visualization, Tangible, Multitouch, User-Centered Design, Usability, Berlin, Potsdam" />

    <link rel="canonical" href="<?php the_permalink(); ?>" />

    <meta property="og:locale" content="<?php echo get_locale(); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php
              if (is_home() || is_front_page()) {
                 bloginfo('name'); echo ' | '; bloginfo('description'); }
              else {
                  bloginfo('name'); echo ' | '; }

              if (function_exists('is_tag') && is_tag()) {
                 single_tag_title("Tag Archive for &quot;"); echo '&quot;'; }
              elseif (is_archive()) {
                 wp_title(''); echo ' Archive'; }
              elseif (is_search()) {
                 echo 'Search for &quot;'.wp_specialchars($s).'&quot;'; }
              elseif (!(is_404()) && (is_single()) || (is_page())) {
                 wp_title(''); }
              elseif (is_404()) {
                 echo 'Not Found'; }

              if ($paged>1) {
                 echo ' - page '. $paged; }
           ?>" />
    <meta property="og:description" content="<?php echo strip_tags(__(get_page_content_by_path('home', false))); ?>" />
    <meta property="og:url" content="<?php the_permalink(); ?>" />
    <meta property="og:site_name" content="<?php bloginfo('name'); echo ' | '; echo bloginfo('description'); ?>" />
    <meta property="og:image" content="//idl.fh-potsdam.de/wp-content/uploads/2016/01/idl-website.jpg" />

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:description" content="<?php strip_tags(__(get_page_content_by_path('home', false))); ?>"/>
    <meta name="twitter:title" content="<?php
              if (is_home() || is_front_page()) {
                 bloginfo('name'); echo ' | '; bloginfo('description'); }
              else {
                  bloginfo('name'); echo ' | '; }

              if (function_exists('is_tag') && is_tag()) {
                 single_tag_title("Tag Archive for &quot;"); echo '&quot;'; }
              elseif (is_archive()) {
                 wp_title(''); echo ' Archive'; }
              elseif (is_search()) {
                 echo 'Search for &quot;'.wp_specialchars($s).'&quot;'; }
              elseif (!(is_404()) && (is_single()) || (is_page())) {
                 wp_title(''); }
              elseif (is_404()) {
                 echo 'Not Found'; }

              if ($paged>1) {
                 echo ' - page '. $paged; }
           ?>"/>
    <meta name="twitter:url" content="<?php the_permalink(); ?>">
    <meta name="twitter:site" content="@idpotsdam"/>
    <meta name="twitter:image" content="//idl.fh-potsdam.de/wp-content/uploads/2016/01/idl-website.jpg"/>
    <meta name="twitter:creator" content="@idpotsdam"/>

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/images/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">

  <?php /* ?>

	<!-- Application-specific meta tags -->
	<!-- Windows 8 -->
	<meta name="application-name" content="" />
	<meta name="msapplication-TileColor" content="" />
	<meta name="msapplication-TileImage" content="" />
	<!-- Twitter -->
	<meta name="twitter:card" content="">
	<meta name="twitter:title" content="">
	<meta name="twitter:description" content="">
	<meta name="twitter:url" content="">
	<meta name="twitter:image" content="">
	<!-- Facebook -->
	<meta property="og:title" content="" />
	<meta property="og:description" content="" />
	<meta property="og:url" content="" />
	<meta property="og:image" content="" />

	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

  <?php */ ?>

	<?php wp_head(); ?>

</head>
<?php
  $extra_classes = '';
  if (function_exists('qtrans_getLanguage')) {
    $extra_classes = qtrans_getLanguage();
  }
?>
<body <?php body_class($extra_classes); ?>>

	<div id="wrap">

		<header>
			<div class="inside">

				<a id="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<?php bloginfo('name'); ?>
					<span class="desc"><?php $info = get_bloginfo('description'); $ei = explode('Interaction Design Lab ', $info); echo 'Interaction Design Lab<br />'.$ei[1]; ?></span>
				</a>

				<div id="header-menu">
					<nav id="nav" class="nav-menu group" role="navigation">
						<?php custom_nav_menu('main-menu'); ?>
					</nav>
					<?php if (function_exists('qtrans_customLanguageSelectCode')) qtrans_customLanguageSelectCode('text'); ?>
					<?php //if (function_exists('qtrans_SelectCode')) qtrans_SelectCode('text'); ?>
					<?php //if (function_exists('qtrans_generateLanguageSelectCode')) qtrans_generateLanguageSelectCode('text'); ?>
				</div>
				<a href="#" id="menu-button">Menu</a>
			</div>
		</header>

    <?php
			// global $isMobile;
			// if (!$isMobile) :
		?>
		<header id="header-fixed">
      <div class="inside">
				<a id="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<?php bloginfo('name'); ?>
					<span class="desc"><?php bloginfo('description'); ?></span>
				</a>

				<nav id="nav" class="nav-menu group" role="navigation">
					<?php custom_nav_menu('main-menu'); ?>
				</nav>
				<?php //if (function_exists('qtrans_customLanguageSelectCode')) qtrans_customLanguageSelectCode('text'); ?>
			</div>
		</header>
		<?php //endif; ?>

		<div id="main" class="inside group">
