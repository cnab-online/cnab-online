<?php
/**
 * @var Silex\Application $app
 */
date_default_timezone_set('America/Sao_Paulo');

use League\Fractal;
use League\Fractal\Manager;
use League\Fractal\Serializer\JsonApiSerializer;
use Doctrine\Common\Cache\ApcuCache;
use Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use CnabOnline\Services\ResponseService;
use CnabOnline\Converters;

$app['converter.file'] = $app->share(function() use($app) {
    return new Converters\FileConverter($app);
});

$app->register(new JDesrosiers\Silex\Provider\CorsServiceProvider());

$app->after($app["cors"]);

$app['fractal'] = new Manager();
$app['fractal']->setSerializer(new JsonApiSerializer());

$app['debug'] = getenv('API_ENVIRONMENT') == 'development';

$app['cache'] = new ApcuCache();

$app['responseService'] = new ResponseService;

$app->register(new DoctrineServiceProvider, array(
    'db.options' => array(
        'driver' => 'pdo_pgsql',
        'host' => getenv('DATABASE_HOST') ?: '',
        'user' => getenv('DATABASE_USER') ?: '',
        'password' => getenv('DATABASE_PASSWORD') ?: '',
        'dbname' => getenv('DATABASE_NAME') ?: '',
    ),
));

$app->register(new DDesrosiers\SilexAnnotations\AnnotationServiceProvider(), array(
    "annot.cache" => $app['cache'],
));

$app->register(new DoctrineOrmServiceProvider, array(
    'orm.proxies_dir' => __DIR__.'/proxies',
    'orm.default_cache' => array(
        'driver' => 'apcu',
    ),
    'orm.cache.factory.apcu' => $app->protect(function () use($app) {
        return $app['cache'];
    }),
    'orm.cache.factory' => $app->protect(function ($driver, $cacheOptions) use ($app) {
        $cacheFactoryKey = 'orm.cache.factory.'.$driver;
        if (!isset($app[$cacheFactoryKey])) {
            throw new \RuntimeException("Factory '$cacheFactoryKey' for cache type '$driver' not defined (is it spelled correctly?)");
        }
        return $app[$cacheFactoryKey]($cacheOptions);
    }),
    'orm.em.options' => array(
        'mappings' => array(
            // Using actual filesystem paths
            array(
                'type' => 'annotation',
                'namespace' => 'CnabOnline\Entities',
                'path' => __DIR__.'/CnabOnline/Entities',
            )
        ),
    ),
));

$app->error(function (Exception $exception, $code) use($app) {
    return $app['responseService']->convertExceptionResponse(
        $exception,
        $app
    );
});

$app->view(function ($resource, Request $request) use ($app) {
    return $app['responseService']->createResponse(
        $resource,
        $request,
        $app
    );
});