#!/usr/local/opt/php70/bin/php
<?php

define('SLACK_HOOK', '');

require("app/config.php");

if (!file_exists('build')) {
  echo "Build directory doesn't exists";
  exit(1);
}

// Deploy here