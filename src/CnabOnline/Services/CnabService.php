<?php
namespace CnabOnline\Services;

use Cnab;
use CnabOnline\Entities\File;
use Doctrine\Common\Cache\Cache;

class CnabService
{
    /**
     * Get Cnab Instance
     *
     * @param File $file File entity
     *
     * @return \Cnab\Retorno\IArquivo
     *
     * @throws \Exception
     */
    public function getCnabInstance(File $file, Cache $cache)
    {
        $cacheKey = 'cnab-instance-'.$file->getSignature();

        if($cache->contains($cacheKey))
            return $cache->fetch($cacheKey);

        $cnabFactory = new Cnab\Factory;

        $filePath = sys_get_temp_dir().'/'.$file->getSignature().'.ret';

        file_put_contents($filePath, $file->getText());

        $cnabFile = $cnabFactory->createRetorno($filePath);

        $cache->save($cacheKey, $cnabFile, 60 * 60 * 24);

        return $cnabFile;
    }
}