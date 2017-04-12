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
		<h3 class="grid-title"><?php _e('[:en]Featured Projects[:de]Ausgewählte Projekte') ?></h3>

		<div id="projects-grid" class="grid">
		<?php
			$args = array(
				'posts_per_page' => -1,
				'post_type'		 => 'project',//array('project', 'publication'),
				'orderby'		 => 'menu_order',
				'order'			 => 'ASC',
				// 'orderby'		 => 'date',
				// 'order'			 => 'DESC',
				'meta_query' => array(
					array(
						'key' => 'featured-home',
						'value' => '1',
						'compare' => '=='
					)
				)
			);
			query_posts($args);

			get_template_part('loop', 'projects');

			// Reset Query
			wp_reset_query();
		?>
		</div>

		<a href="<?php echo get_page_link_by_path('projects'); ?>" class="more-link"><?php _e('[:en]More Projects[:de]Mehr Projekte'); ?></a>
	</div>

	<div id="publications-section" class="section">
		<h3><?php _e('[:en]Recent Publications[:de]Aktuelle Veröffentlichungen') ?></h3>

		<div class="publications-list short">
		<?php
			// Loop through all years
			$args = array(
					'orderby'       => 'name',
					'order'         => 'DESC',
					'hide_empty'    => true,
					'number' => 2
					// 'number' => 2
			);
			$terms = get_terms('year', $args);

			// Look publications for each year
			if (!is_wp_error($terms) && count($terms) > 0) :

					$terms_array = array();
					foreach ($terms as $term) {
						array_push($terms_array, $term->slug);
					}

				foreach ($terms_array as $term_id) :

					$args = array(
						'posts_per_page' => 3,
						'post_type'		 => 'publication',
						'orderby'		 => 'menu_order',
						'order'			 => 'DESC',
						'post__in' 		 => $ids,
						'tax_query' 	 => array(
												array(
													'taxonomy' => 'year',
													'field'    => 'slug',
													'terms'    => $term_id,
												)
											)
					);
					query_posts($args);

					if (have_posts()) :
		?>
			<?php get_template_part('loop', 'publications-short'); ?>
		<?php
				endif;

				// Reset Query
				wp_reset_query();

				endforeach;
			endif;
		?>
		</div>
		<a href="<?php echo get_page_link_by_path('academia'); ?>" class="more-link"><?php _e('[:en]More Publications[:de]Mehr Veröffentlichungen'); ?></a>
	</div>

<?php get_footer(); ?>
