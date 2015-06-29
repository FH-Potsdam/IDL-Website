<?php get_header(); ?>
			
	<div class="page-intro">
		<?php echo get_page_content_by_path('home', false); ?>
	</div>
	
	<?php if (have_posts()) : ?>
	<div id="stories-section" class="section">
		<h3>Recent Stories</h3>
		<div id="stories-carousel">
			
		</div>
	</div>
	<?php endif; ?>
	
	<div id="projects-section" class="section">
		<h3>Featured Projects</h3>

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