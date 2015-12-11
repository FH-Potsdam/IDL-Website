<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div id="content">
			<h1><?php the_title(); ?></h1>
			<div class="subtitle"><?php the_subtitle(); ?></div>

			<?php if (has_excerpt()) : ?>
			<div class="entry-excerpt">
				<?php the_manual_excerpt(); ?>
			</div>
			<?php endif; ?>

			<div id="publications-section" class="section">
			<?php
				// Loop through all years
				$args = array(
				    'orderby'       => 'name',
				    'order'         => 'DESC',
				    'hide_empty'    => true
				);
				$terms = get_terms('year', $args);

				if (!is_wp_error($terms) && count($terms) > 0) :

				    foreach ( $terms as $term ) :
			?>
				<h2><?php echo $term->name; ?></h2>

				<div class="publications-list">
				<?php
					$args = array(
						'posts_per_page' => -1,
						'post_type'		 => 'publication',
						'orderby'		 => 'menu_order',
						'order'			 => 'ASC',
						'tax_query' 	 => array(
												array(
													'taxonomy' => 'year',
													'field'    => 'slug',
													'terms'    => $term->slug,
												)
											)
					);
					query_posts($args);

				 	get_template_part('loop', 'publications');

				 	// Reset Query
				 	wp_reset_query();
				?>
				</div>
			<?php
					endforeach;
				endif;
			?>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
