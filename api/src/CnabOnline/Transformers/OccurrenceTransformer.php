<?php

namespace CnabOnline\Transformers;

use League\Fractal;

class OccurrenceTransformer extends Fractal\TransformerAbstract
{
    public function transform(\Cnab\Retorno\IDetalhe $occurrence)
    {
        return [
            'id' => $occurrence->getNumeroSequencial(),
            'code' => $occurrence->getCodigo(),
            'code_name' => $occurrence->getCodigoNome(),
            'received_value' => $occurrence->getValorRecebido(),
            'title_value' => $occurrence->getValorTitulo(),
            'bank_tax' => $occurrence->getValorTarifa(),
            'iof_tax' => $occurrence->getValorIOF(),
            'discount_value' => $occurrence->getValorDesconto(),
            'rebate_value' => $occurrence->getValorAbatimento(),
            'others_credits_value' => $occurrence->getValorOutrosCreditos(),
            'mulct_value' => $occurrence->getValorMoraMulta(),
            'document_number' => $occurrence->getNumeroDocumento(),
            'wallet' => $occurrence->getCarteira(),
            'agency' => $occurrence->getAgencia(),
            'our_number' => $occurrence->getNossoNumero(),
            'due_date' => $occurrence->getDataVencimento() ?
                $occurrence->getDataVencimento()->format('Y-m-d') :
                null,
            'credit_date' => $occurrence->getDataCredito() ?
                $occurrence->getDataCredito()->format('Y-m-d') :
                null,
            'occurrence_date' => $occurrence->getDataOcorrencia() ?
                $occurrence->getDataOcorrencia()->format('Y-m-d') :
                null,
            'charged_agency' => trim(implode('-', [
                    $occurrence->getAgenciaCobradora(),
                    $occurrence->getAgenciaCobradoraDac(),
                ]), '- '),
            'sequencial_number' => $occurrence->getNumeroSequencial(),
            'is_payment' => $occurrence->isBaixa(),
            'is_rejected_payment' => $occurrence->isBaixaRejeitada(),
            'liquidation_code' => $occurrence->getCodigoLiquidacao(),
            'liquidation_description' => $occurrence->getDescricaoLiquidacao(),
            'is_dda' => $occurrence->isDDA(),
            'payer_allegation' => $occurrence->getAlegacaoPagador(),
        ];
    }
}