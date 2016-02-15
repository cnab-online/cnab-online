<?php
/**
 * @var Silex\Application $app
 */

use Silex\Application;

$app->mount('/v1', new CnabOnline\Controllers\FileControllerProvider());