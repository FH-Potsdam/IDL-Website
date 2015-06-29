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

			<div id="people-grid" class="grid group">
			<?php 
				$args = array(
					'posts_per_page' => -1,
					'post_type'		 => 'people',
					'orderby'		 => 'menu_order',
					'order'			 => 'ASC'
				);
				query_posts($args);
			 	
			 	get_template_part('loop', 'people');

			 	// Reset Query
			 	wp_reset_query();
			?>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>