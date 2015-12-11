<?php
/**
 * The loop that displays the team members
 *
 */
?>
	<?php
	// Loop
	if (have_posts()) : while (have_posts()) : the_post();

		// Filters
		$post_filters = get_the_terms_classes('category'); // . ' ' . get_the_terms_classes('post_tag');
	?>
		<li><?php the_title(); ?></li>
		<?php /* ?>
		<div id="people-<?php the_ID(); ?>" class="people <?php echo $post_filters; ?>">
			<a class="entry" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<h2><span><?php the_title(); ?></span></h2>
			</a>
		</div>
		<?php */ ?>
	<?php endwhile; endif; ?>
