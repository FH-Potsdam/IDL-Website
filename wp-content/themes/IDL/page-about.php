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

					<?php
						/* SUBPAGES Structure */
						/*$args = array(
							'posts_per_page' => -1,
							'post_type'		 => 'page',
							'orderby'		 => 'menu_order',
							'order'			 => 'ASC',
							'post_parent'	 => get_the_ID(),
							'post_status'	 => array( 'publish', 'private' ) // children are private
						);
						$sub_loop = new WP_Query( $args );
						
						if ($sub_loop->have_posts()) : while ($sub_loop->have_posts()) : $sub_loop->the_post();
					?>
						<div class="subpage">
							
							<h2><?php the_title(); ?></h2>
							
							<div class="entry-content">
								<div class="entry-content">
									<?php the_content(); ?>
								</div>
							</div>

						</div>
							
					<?php endwhile; endif;*/ ?>
				</div>
			</div>
		</div>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>