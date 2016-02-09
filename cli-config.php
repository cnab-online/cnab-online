<?php
require_once __DIR__ . '/vendor/autoload.php';

use Silex\Application;
use Doctrine\ORM\Tools\Console\ConsoleRunner;

$app = new Silex\Application();

include 'src/config.php';

return ConsoleRunner::createHelperSet($app['orm.em']);
