<?php 
/**
 * The loop that displays the projects
 *
 */
?>
	<?php 
	// Loop
	if (have_posts()) : while (have_posts()) : the_post(); 

		// Filters
		$post_filters = get_the_terms_classes('category'); // . ' ' . get_the_terms_classes('post_tag');
	?>
		
		<div id="project-<?php the_ID(); ?>" class="project box <?php echo $post_filters; ?>">
			<a class="thumb" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_post_thumbnail('grid-thumb'); ?></a>
			<a class="entry" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<h2><span><?php the_title(); ?></span></h2>
				<span class="subtitle"><?php echo get_post_custom_field('subtitle'); ?></span>
			</a>
		</div>
	<?php
		endwhile; else : 
	?>
		<p>No projects found</p>
	<?php endif; ?>