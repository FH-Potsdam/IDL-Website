<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div id="content">
				
			<h1><?php the_title(); ?></h1>
			<div class="subtitle"><?php the_subtitle(); ?></div>
			
			<div class="entry">
				<div class="entry-main">
					
					<?php if (has_excerpt()) : ?>
					<div class="entry-excerpt">
						<?php the_manual_excerpt(); ?>	
					</div>
					<?php endif; ?>

					<div class="entry-content sep">
						<?php the_content(); ?>
					</div>

					<div class="entry-related">
						
						<?php // Projects ?>
						<?php if (get_field('member_publications')) : ?>
						<div class="section sep">
							<h2>Projects</h2>
							<div id="projects" class="group">
								<?php 
									$args = array(
										'posts_per_page' => -1,
										'post_type'		 => 'project',
										'orderby'		 => 'menu_order',
										'order'			 => 'ASC'
									);
									query_posts($args);
									
									get_template_part('loop', 'grid'); 

									// Reset Query
									wp_reset_query();
								?>
							</div>
						</div>
						<?php endif; ?>

						<?php // Publications ?>
						<?php if (get_field('member_publications')) : ?>
						<div class="section">
							<h2>Publications</h2>
						</div>
						<?php endif; ?>
					</div>
				</div>

				<div class="entry-side">
					<?php // Thumbnail ?>
					<div class="entry-image">
						<?php the_post_thumbnail('member-image'); ?>
					</div>

					<?php // Website ?>
					<?php if (get_field('member_website')) : ?>
						<h5>Website</h5>
						<a target="_blank" href="<?php the_field('member_website'); ?>"><?php the_field('member_website'); ?></a>
					<?php endif; ?>

					<?php // Email ?>
					<?php if (get_field('member_email')) : ?>
						<h5>Email</h5>
						<a href="mailto:<?php the_field('member_website'); ?>"><?php the_field('member_email'); ?></a>
					<?php endif; ?>

					<?php // Twitter ?>
					<?php if (get_field('member_twitter')) : ?>
						<h5>Twitter</h5>
						<?php  
							$twitter_user = get_field('member_twitter');
							$twitter_profile = 'http://twitter.com/' . str_replace('@', '', $twitter_user);
						?>
						<a target="_blank" href="<?php echo $twitter_profile; ?>"><?php echo $twitter_user; ?></a>
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