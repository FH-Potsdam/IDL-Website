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

			<div class="entry group">
				<div class="entry-main">

					<?php if (has_post_thumbnail()) : ?>
					<div class="entry-image">
						<?php the_post_thumbnail('full'); ?>
					</div>
					<?php endif; ?>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>