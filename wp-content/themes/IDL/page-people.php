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

			<?php
				// Loop through all years
				$args = array(
				    'orderby'       => 'term_order',
				    'order'         => 'ASC',
				    'hide_empty'    => true
				);
				$terms = get_terms('people-category', $args);

				if (!is_wp_error($terms) && count($terms) > 0) :
					foreach ( $terms as $term ) :

					$args = array(
						'posts_per_page' => -1,
						'post_type'		 => 'people',
						'orderby'		 => 'menu_order',
						'order'			 => 'ASC',
						'tax_query' 	 => array(
												array(
													'taxonomy' => 'people-category',
													'field'    => 'slug',
													'terms'    => $term->slug,
												)
											)
					);
					query_posts($args);

					$template = 'people';

					// Past members
					if (strpos($term->slug, 'past') === false) :
				?>

					<h3 class="grid-title"><?php echo $term->name; ?></h3>
					<div class="people-grid grid group">
						<?php get_template_part('loop', 'people'); ?>
					</div>

				<?php else : ?>
					<div class="column">
						<h3><?php echo $term->name; ?></h3>
						<div class="people-list">
							<ul>
								<?php get_template_part('loop', 'people-past'); ?>
							</ul>
						</div>
					</div>
				<?php
					endif;

				 	// Reset Query
				 	wp_reset_query();
				?>

		<?php
				endforeach;
			endif;
		?>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
