<?php get_header(); ?>

	<div id="content">
		<h2><?php _e('Error 404 - Page not found'); ?></h2>
		<div class="subtitle"><?php the_subtitle(); ?></div>

		<div class="entry group">
			<div class="entry-main">
				<div class="entry-content">
					<?php _e('[:en]The page you are looking for does not exist.[:de]Diese Seite haben wir leider nicht gefunden.'); ?>
				</div>
			</div>
		</div>
	</div>

<?php get_footer(); ?>
