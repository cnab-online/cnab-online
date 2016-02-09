<?php
/**
 * @var Silex\Application $app
 */

use Silex\Application;

$app->mount('/', new CnabOnline\Controllers\FileControllerProvider());