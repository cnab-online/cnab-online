<?php
namespace CnabOnline\Converters;

use CnabOnline\Entities\File;
use CnabOnline\Services\CnabService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class FileConverter
{
    public $app;
    public $cnabService;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->cnabService = new CnabService;
    }

    /**
     * Convert file id to file entity
     * @return \CnabOnline\Entities\File
     */
    public function convert($fileUid)
    {
        $em = $this->app['orm.em'];

        $fileRepository = $em->getRepository(File::class);

        $files = $fileRepository->findByUid($fileUid);

        if(count($files) == 0)
            throw new NotFoundHttpException("File not found");

        $file = $files[0];

        $cnabInstance = $this->cnabService->getCnabInstance($file, $this->app['cache']);

        $file->setCnabInstance($cnabInstance);

        return $file;
    }
}