<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div id="content">
				
			<h1><?php the_title(); ?></h1>
			<div class="subtitle"><?php the_subtitle(); ?></div>
			
			<div class="entry">

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
						<?php  
							$member_email = get_field('member_email');
						?>
						<a href="mailto:<?php echo $member_email; ?>"><?php echo $member_email; ?></a>
					<?php endif; ?>

					<?php // Twitter ?>
					<?php if (get_field('member_twitter')) : ?>
						<h5>Twitter</h5>
						<?php  
							$twitter_user = get_field('member_twitter');
							$twitter_username = str_replace('@', '', $twitter_user);
							$twitter_show = '@' . $twitter_username;
							$twitter_profile = 'http://twitter.com/' . $twitter_username;
						?>
						<a target="_blank" href="<?php echo $twitter_profile; ?>"><?php echo $twitter_show; ?></a>
					<?php endif; ?>
				</div>
				
				<div class="entry-main">
					
					<?php if (has_excerpt()) : ?>
					<div class="entry-excerpt">
						<?php the_manual_excerpt(); ?>	
					</div>
					<?php endif; ?>

					<div class="entry-content">
						<?php the_content(); ?>
					</div>

					<div class="entry-related">
						
						<?php // Projects ?>
						<?php  
						   /*
							*  Query projects from a relationship value.
							*  This method uses the meta_query LIKE to match the string "123" to the database value a:1:{i:0;s:3:"123";} (serialized array)
							*/
							$args = array(
								'posts_per_page' => -1,
								'post_type'		 => 'project',
								'orderby'		 => 'menu_order',
								'order'			 => 'ASC',
								'meta_query' 	 => array(
														array(
															'key' => 'project_team', 			 // name of custom field
															'value' => '"' . get_the_ID() . '"', // matches exaclty "123", not just 123. This prevents a match for "1234"
															'compare' => 'LIKE'
														)
													)
							);
							query_posts($args);

							if (have_posts()) :
						?>
						<div id="projects-section" class="section">
							<h2>Projects</h2>
							<div class="projects-list group">
								<?php get_template_part('loop', 'projects'); ?>
							</div>
						</div>
						<?php 
							// Reset Query
							wp_reset_query();
							endif; 
						?>

						<?php // Publications ?>
						<?php if (get_field('member_publications')) : ?>
						<div id="publications-section" class="section">
							<h2>Publications</h2>
							<?php

								// Loop through all years
								$args = array(
								    'orderby'       => 'name', 
								    'order'         => 'DESC',
								    'hide_empty'    => true
								);
								$terms = get_terms('year', $args);

								// Look publications for each year
								if (!is_wp_error($terms) && count($terms) > 0) : foreach ( $terms as $term ) :

							    	$ids = get_field('member_publications', false, false);

							    	$args = array(
							    		'posts_per_page' => -1,
							    		'post_type'		 => 'publication',
							    		'orderby'		 => 'menu_order',
							    		'order'			 => 'ASC',
							    		'post__in' 		 => $ids,
							    		'tax_query' 	 => array(
							    								array(
							    									'taxonomy' => 'year',
							    									'field'    => 'slug',
							    									'terms'    => $term->slug,
							    								)
							    							)
							    	);
							    	query_posts($args);

							    	if (have_posts()) :
							?>
								<h3><?php echo $term->name; ?></h3>

								<div class="publications-list">
								<?php get_template_part('loop', 'publications-short'); ?>
								</div>
							<?php
									endif; 

									// Reset Query
								 	wp_reset_query();
									
								endforeach;
								endif;
							?>
						</div>
						<?php endif; ?>
					</div>
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