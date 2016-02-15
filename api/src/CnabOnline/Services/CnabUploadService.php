<?php
namespace CnabOnline\Services;

use Silex\Application;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use CnabOnline\Entities\File;
use Cnab;
use Exception;
use DateTime;

class CnabUploadService
{
    /**
     * Process uploaded file
     *
     * @return \CnabOnline\Entities\File
     */
    public function processUploadedFile(UploadedFile $uploadedFile, Application $app)
    {
        $cnabService = new CnabService;

        $extension = strtolower($uploadedFile->getClientOriginalExtension());

        $allowedExtensions = ['txt', 'ret'];

        if(!in_array($extension, $allowedExtensions)) {
            throw new BadRequestHttpException(
                "Extensão inválida '$extension', utilize apenas '".implode("', '", $allowedExtensions)."'"
            );
        }

        $fileContents = file_get_contents($uploadedFile->getPathname());
        $fileSignature = sha1($fileContents);

        $fileRepository = $app['orm.em']->getRepository(File::class);

        $files = $fileRepository->findBySignature($fileSignature);

        $file = (count($files) > 0) ? $files[0] : null;
        
        if(!$file) {
            $file = new File;
            $file->setUid(sha1(uniqid(rand(), true)));
            $file->setName($uploadedFile->getClientOriginalName());
            $file->setSignature($fileSignature);
            $file->setCreatedAt(new DateTime);
        }

        $file->setText($fileContents);
        $file->setUpdatedAt(new DateTime);

        try {
            $cnabFile = $cnabService->getCnabInstance($file, $app['cache']);
        } catch(Exception $e) {
            throw new UnprocessableEntityHttpException($e->getMessage());
        }

        return $file;
    }
}