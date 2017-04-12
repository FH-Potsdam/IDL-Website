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

			<div id="projects-filter" class="sort-filters nav-menu">
				<?php the_projects_filter(); ?>
			</div>

			<div id="projects-grid" class="grid">
			<?php
				$args = array(
					'posts_per_page' => -1,
					'post_type'		 => 'project',
					'orderby'		 => 'menu_order',
					'order'			 => 'ASC'
					// 'orderby'		 => 'date',
					// 'order'			 => 'DESC'
				);
				query_posts($args);

			 	get_template_part('loop', 'projects');

			 	// Reset Query
			 	wp_reset_query();
			?>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
