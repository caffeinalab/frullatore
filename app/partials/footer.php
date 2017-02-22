<?php global $_ROUTE; ?>
</div><!--/AJAX-->
<!-- After this point, all HTML will be ignored by AJAX -->

<?php if (!isset($_ROUTE['noJS'])) : ?>
	<script src="scripts/main.js?v=<?= VERSION ?>"></script>
<?php endif; ?>

</body>
</html>