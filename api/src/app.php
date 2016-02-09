<?php
use Silex\Application;

$app = new Silex\Application();

include 'src/config.php';
include 'src/routes.php';

return $app;