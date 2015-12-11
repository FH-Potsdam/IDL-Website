<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<div class="page-intro">
		<?php echo get_page_content_by_path('home', false); ?>
	</div>
	<?php endwhile; endif; ?>
	<?php /*if (have_posts()) : ?>
	<div id="stories-section" class="section">
		<h3>Recent Stories</h3>
		<div id="stories-carousel">

		</div>
	</div>
	<?php endif;*/ ?>

	<div id="projects-section" class="section">
		<h3 class="grid-title">Featured Projects</h3>

		<div id="projects-grid" class="grid">
		<?php
			$args = array(
				'posts_per_page' => -1,
				'post_type'		 => 'project',//array('project', 'publication'),
				'orderby'		 => 'menu_order',
				'order'			 => 'ASC'
			);
			query_posts($args);

			get_template_part('loop', 'projects');

			// Reset Query
			wp_reset_query();
		?>
		</div>
	</div>

<?php get_footer(); ?>
