<?php 
/**
 * The loop that displays the publications list
 *
 */
?>
	<?php 
	if (have_posts()) : while (have_posts()) : the_post(); 
	?>
		<div id="publication-<?php the_ID(); ?>" class="publication group">
			
			<div class="entry-side">
				<h4><?php the_title(); /*if (get_field('publication_file')) : ?>
					<a target="_blank" href="<?php the_field('publication_file'); ?>"><?php the_title(); ?></a>
				<?php
					else: the_title(); endif;*/
				?></h4>

				<?php // File ?>
				<?php if (get_field('publication_file')) : ?>
					– <a class="download-link" target="_blank" href="<?php the_field('publication_file'); ?>">PDF</a>
				<?php endif; ?>

			</div>

			<div class="entry-main">
				<div class="publication-meta">
					<?php // Authors ?>
					<?php if (get_field('publication_authors')) : ?>
						<ul class="publication-authors">
							<?php the_row_list('publication_authors') ?>
						</ul>
					<?php endif; ?>
					–
					<?php // Conference ?>
					<?php if (get_field('publication_conference')) : ?>
						<span class="publication-conf"><?php the_field('publication_conference'); ?></span>
					<?php endif; ?>

				</div>
				<div class="entry-content">
					<?php echo get_the_content(); ?>
				</div>		
			</div>
		
		</div>
	<?php endwhile; else : ?>
		<p>No publication found</p>
	<?php endif; ?>