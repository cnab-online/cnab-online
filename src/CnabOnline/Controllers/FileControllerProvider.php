<?php
namespace CnabOnline\Controllers;

use League\Fractal;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\ControllerProviderInterface;
use DDesrosiers\SilexAnnotations\Annotations as Router;
use CnabOnline\Services\CnabUploadService;
use CnabOnline\Transformers\FileTransformer;
use CnabOnline\Transformers\OccurrenceTransformer;
use CnabOnline\Transformers\LineTransformer;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class FileControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        return $app['annot']->process(get_class($this), false, true);
    }

    /**
     * @Router\Route(
     *      @Router\Request(method="POST", uri="/file"),
     * )
     */
    public function processFile(Application $app, Request $request)
    {
        $uploadedFile = $request->files->get('file');
        $cnabUploadService = new CnabUploadService;

        if(is_null($uploadedFile))
            throw new BadRequestHttpException("File not sent");

        $file = $cnabUploadService->processUploadedFile($uploadedFile, $app);

        $app['orm.em']->persist($file);
        $app['orm.em']->flush();

        $subRequest = Request::create('/file/'.$file->getUid(), 'GET');

        return $app->handle($subRequest, HttpKernelInterface::SUB_REQUEST);
    }

    /**
     * @Router\Route(
     *      @Router\Request(method="GET", uri="/file/{file}"),
     *      @Router\Convert(variable="file", callback="converter.file:convert")
     * )
     */
    public function showFile(Application $app, Request $request, $file)
    {
        return new Fractal\Resource\Item($file, new FileTransformer, 'files');
    }

    /**
     * @Router\Route(
     *      @Router\Request(method="GET", uri="/file/{file}/lines"),
     *      @Router\Convert(variable="file", callback="converter.file:convert")
     * )
     */
    public function showLines(Application $app, Request $request, $file)
    {
        $cnabInstance = $file->getCnabInstance();

        $lines = $cnabInstance->linhas;

        return new Fractal\Resource\Collection($lines, new LineTransformer, 'lines');
    }

    /**
     * @Router\Route(
     *      @Router\Request(method="GET", uri="/file/{file}/occurrences"),
     *      @Router\Convert(variable="file", callback="converter.file:convert")
     * )
     */
    public function showOccurrences(Application $app, Request $request, $file)
    {
        $cnabInstance = $file->getCnabInstance();

        $occurrences = $cnabInstance->listDetalhes();

        return new Fractal\Resource\Collection($occurrences, new OccurrenceTransformer, 'occurrences');
    }
}