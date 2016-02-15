<?php

namespace CnabOnline\Transformers;

use League\Fractal;

class LineTransformer extends Fractal\TransformerAbstract
{
    public function transform(\Cnab\Retorno\Linha $line)
    {
        $identifiedFields = array();

        if($line->linhaCnab) {
            foreach($line->linhaCnab->getFields() as $field) {
                $identifiedFields[] = array(
                    'name' => $field->getName(),
                    'value' => $field->getValue(),
                    'start' => $field->pos_start,
                    'end' => $field->pos_end,
                );
            }
        }

        return [
            'id' => $line->pos,
            'raw_text' => $line->texto,
            'identified_fields' => $identifiedFields,
        ];
    }
}