<?php global $_SITEMAP; ?><?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<?php foreach ($_SITEMAP as $s) : ?>
	<url>
		<loc><?= $s['loc'] ?></loc>
		<lastmod><?= date('Y-m-d') ?></lastmod>
	</url>
	<?php endforeach; ?>
</urlset>