<?php
namespace Tests;

use Silex\WebTestCase;

class TestCase extends WebTestCase
{
    public function createApplication()
    {
        $app = require __DIR__.'/../src/app.php';
        $app['debug'] = true;
        unset($app['exception_handler']);

        return $app;
    }

    public function getFixturePath()
    {
        return __DIR__.'/fixtures';
    }
}