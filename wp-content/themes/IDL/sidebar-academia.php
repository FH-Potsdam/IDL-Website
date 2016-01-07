<?php
  // Loop through all years
  $args = array(
      'orderby'       => 'name',
      'order'         => 'DESC',
      'hide_empty'    => true
  );
  $terms = get_terms('year', $args);

  if (!is_wp_error($terms) && count($terms) > 0) :
?>
  <div class="content-nav-widget">
    <h5>Years</h5>
    <ul class="content-nav">
    <?php foreach ( $terms as $term ) : ?>
      <li><a href="#<?php echo $term->slug; ?>"><?php echo $term->name; ?></a></li>
    <?php endforeach; ?>
    </ul>
  </div>
<?php
  endif;
?>
