		</div>
	</div>

	<footer>
		<div class="inside">
			<a id="fhp-logo" href="http://interface.fh-potsdam.de" target="_blank">FHP</a>
			<nav>
				<small>
					&copy; <?php echo date("Y");?> FH Potsdam
				</small>
				<?php wp_nav_menu( array('menu' => 'footer-menu')); ?>
			</nav>
		</div>
	</footer>

	<?php wp_footer(); ?>

<!-- Asynchronous google analytics; this is the official snippet.
	 Replace UA-XXXXXX-XX with your site's ID and uncomment to enable.
	 
<script>

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-XXXXXX-XX']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
-->
	
</body>

</html>
