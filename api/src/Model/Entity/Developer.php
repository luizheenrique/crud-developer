<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\I18n\Date;
use Cake\ORM\Entity;

/**
 * Developer Entity
 *
 * @property int $id
 * @property string $nome
 * @property string $sexo
 * @property string|null $hobby
 * @property \Cake\I18n\FrozenDate $datanascimento
 */
class Developer extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'nome' => true,
        'sexo' => true,
        'idade' => true,
        'hobby' => true,
        'datanascimento' => true,
    ];

    /**
     * @var array
     */
    protected $_virtual = [
        'idade'
    ];

    /**
     * @return int
     */
    protected function _getIdade(): int
    {
        return $this->datanascimento->diffInYears(new Date());
    }
}
