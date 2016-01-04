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

			<h4><?php the_title(); /*if (get_field('publication_file')) : ?>
				<a target="_blank" href="<?php the_field('publication_file'); ?>"><?php the_title(); ?></a>
			<?php
				else: the_title(); endif;*/
			?></h4>

			<div class="publication-meta">
				<?php // Authors ?>
				<?php if (get_field('publication_authors')) : ?>
					<ul class="publication-authors">
						<?php the_row_list('publication_authors') ?>
					</ul>
				<?php endif; ?>

				<?php // Conference ?>
				<?php if (get_field('publication_conference')) : ?>
				–	<span class="publication-conf"><?php the_field('publication_conference'); ?></span>
				<?php endif; ?>
			</div>

			<div class="publication-more">

				<?php
					$has_file = get_field('publication_file');
					$has_content = has_content();
				?>
				<?php // File ?>
				<?php if ($has_file) : ?>
					<a class="download-link" target="_blank" href="<?php the_field('publication_file'); ?>">PDF</a>
				<?php endif;

				if ($has_file && $has_content) echo ' – ';

				if ($has_content) : ?>
				<a href="#" class="show-content"><span class="show"><?php _e('[:en]Show Abstract[:de]Abstrakt einblenden') ?></span><span class="hide"><?php _e('[:en]Hide Abstract[:de]Abstrakt ausblenden') ?></span></a>
				<?php endif; ?>
			</div>

			<div class="entry-content">
				<?php echo get_the_content(); ?>
			</div>

		</div>
	<?php endwhile; else : ?>
		<p>No publication found</p>
	<?php endif; ?>
