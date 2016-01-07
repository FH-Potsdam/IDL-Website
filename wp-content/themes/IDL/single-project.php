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

					<div class="entry-image">
						<?php the_post_thumbnail('full'); ?>
					</div>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>

					<div class="entry-related">

						<?php // Publications ?>
						<?php if (get_field('related_publications')) : ?>
						<div id="publications-section" class="section">
							<h2>Publications</h2>
							<div class="publications-list">
								<?php
									$ids = get_field('related_publications', false, false);

									$args = array(
										'posts_per_page' => -1,
										'post_type'		 => 'publication',
										'orderby'		 => 'menu_order',
										'order'			 => 'ASC',
										'post__in' 		 => $ids,
										/*'tax_query' 	 => array(
																array(
																	'taxonomy' => 'year',
																	'field'    => 'slug',
																	'terms'    => $term->slug,
																)
															)*/
									);
									query_posts($args);

								 	get_template_part('loop', 'publications-short');

								 	// Reset Query
								 	wp_reset_query();
								?>
							</div>
						</div>
						<?php endif; ?>

					</div>
				</div>

				<div class="entry-side">
					<?php //the_project_meta(); ?>

					<?php // Team ?>
					<?php if (get_field('project_team') || get_field('project_team_external')) : ?>
						<h5>Team</h5>
						<ul>
							<?php the_team_list(); ?>
							<?php the_row_list('project_team_external') ?>
						</ul>
					<?php endif; ?>

					<?php // Partners ?>
					<?php if( have_rows('project_partners') ): ?>
						<h5>Partners</h5>
						<ul>
							<?php the_row_list('project_partners') ?>
						</ul>
					<?php endif; ?>

					<?php // Year ?>
					<?php if (get_field('project_year')) : ?>
						<h5>Year</h5>
						<?php the_field('project_year'); ?>
					<?php endif; ?>

					<?php // Website ?>
					<?php if (get_field('project_website')) : ?>
						<h5>Website</h5>
						<?php
							$project_website = get_field('project_website');

							$project_website_show = str_replace('http://', '', $project_website);
							//$project_website_show = str_replace('www.', '', $project_website_show);
							$project_website_show = rtrim($project_website_show, '/');
						?>
						<a target="_blank" href="<?php echo $project_website; ?>"><?php echo $project_website_show; ?></a>
					<?php endif; ?>

					<?php // Founding ?>
					<?php if( have_rows('project_founding') ): ?>
						<h5>Founding</h5>
						<ul class="founding-list">
							<?php the_row_logos_list('project_founding') ?>
						</ul>
					<?php endif; ?>
				</div>
			</div>

			<?php /* ?>
			<div class="project-gallery">
				<ul>
					<?php the_post_gallery_custom('full'); ?>
				</ul>
			</div>

			<div class="project-nav-bottom">
				<?php include (TEMPLATEPATH . '/inc/nav-single.php' ); ?>
			</div>
			<?php */ ?>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>
