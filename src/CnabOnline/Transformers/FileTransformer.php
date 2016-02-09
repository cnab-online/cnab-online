<?php

namespace CnabOnline\Transformers;

use League\Fractal;
use CnabOnline\Entities\File;

class FileTransformer extends Fractal\TransformerAbstract
{
    public function transform(File $file)
    {
        $cnabInstance = $file->getCnabInstance();
        $dataGeracao = $cnabInstance->getDataGeracao();

        $bankName = null;
        $companyName = null;

        if($cnabInstance->header->existField('nome_banco'))
            $bankName = $cnabInstance->header->nome_banco;

        if($cnabInstance->header->existField('nome_do_banco'))
            $bankName = $cnabInstance->header->nome_do_banco;

        if($cnabInstance->header->existField('nome_empresa'))
            $companyName = $cnabInstance->header->nome_empresa;

        if($cnabInstance->header->existField('nome_da_empresa'))
            $companyName = $cnabInstance->header->nome_da_empresa;

        return [
            'id' => $file->getUid(),
            'name' => $file->getName(),
            'bank_name' => $bankName,
            'bank_code' => $cnabInstance->getCodigoBanco(),
            'company_name' => $companyName,
            'account_number' => trim(implode('-', [$cnabInstance->getConta(), $cnabInstance->getContaDac()]), '- '),
            'generation_date' => $dataGeracao ? $dataGeracao->format('Y-m-d H:i:s') : null,
        ];
    }
}