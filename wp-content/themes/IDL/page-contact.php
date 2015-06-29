<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div id="content">
				
			<h1><?php the_custom_title(); ?></h1>

			<div class="entry">
				<div class="entry-content">
					<?php the_content(); ?>
				</div>

				<div class="entry-form">
					<?php the_manual_excerpt(); ?>
				</div>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>